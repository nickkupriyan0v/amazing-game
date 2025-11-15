const CACHE_NAME = 'my-site-cache-v1';
const URLS = ['/', '/index.html'];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(URLS);
      })
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  if (url.pathname.startsWith('/api/') && event.request.method === 'GET') {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            fetch(event.request)
              .then(networkResponse => {
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME)
                  .then(cache => cache.put(event.request, responseToCache));
              });
            return response;
          }
          
          return fetch(event.request)
            .then(response => {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseToCache));
              return response;
            });
        })
    );
    return;
  }

  if (url.pathname.startsWith('/api/') && ['POST', 'PUT', 'DELETE'].includes(event.request.method)) {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return queueApiRequest(event.request);
        })
    );
    return;
  }

  if (!event.request.url.startsWith('http')) {
    return;
  }
  
  if (event.request.url.includes('@vite') || 
      event.request.url.includes('/ws') ||
      event.request.url.includes('?import')) {
    return;
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('/index.html')
        .then(response => response || fetch(event.request))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;

        return fetch(event.request)
          .then(response => {
            if (response.status === 200 && 
                event.request.method === 'GET' &&
                !event.request.url.includes('/api/') &&
                event.request.url.startsWith(self.location.origin) &&
                !event.request.url.includes('ws')
              ) {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
            }
            return response;
          });
      })
  );
});

const API_QUEUE = 'api-queue';

async function queueApiRequest(request) {
  try {
    const db = await openDB();
    const transaction = db.transaction(['apiQueue'], 'readwrite');
    const store = transaction.objectStore('apiQueue');
    
    const requestData = {
      id: Date.now() + Math.random(),
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
      body: await request.clone().text(),
      timestamp: Date.now()
    };
    
    await store.add(requestData);
    
    return new Response(JSON.stringify({ 
      queued: true, 
      message: 'Request queued for later submission' 
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Failed to queue request:', error);
    return new Response(JSON.stringify({ error: 'Failed to queue request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(sendQueuedRequests());
  }
});

async function sendQueuedRequests() {
  try {
    const db = await openDB();
    const transaction = db.transaction(['apiQueue'], 'readwrite');
    const store = transaction.objectStore('apiQueue');
    const allRequests = await store.getAll();
    
    for (const requestData of allRequests) {
      try {
        await fetch(requestData.url, {
          method: requestData.method,
          headers: requestData.headers,
          body: requestData.body
        });
        await store.delete(requestData.id);
        console.log('Successfully sent queued request:', requestData.url);
      } catch (error) {
        console.log('Failed to send queued request:', requestData.url, error);
      }
    }
  } catch (error) {
    console.error('Error processing queue:', error);
  }
}

self.addEventListener('online', () => {
  sendQueuedRequests();
});

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('ApiQueueDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('apiQueue')) {
        const store = db.createObjectStore('apiQueue', { keyPath: 'id' });
        store.createIndex('timestamp', 'timestamp');
      }
    };
  });
}
