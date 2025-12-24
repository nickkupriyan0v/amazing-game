module.exports = {
  apps: [
    {
      name: 'server-api',
      script: 'packages/server/dist/index.js',
      env: {
        NODE_ENV: 'production',
        DATABASE_URL: 'postgresql://myuser:changeme123@localhost:5432/myapp',
      },
    },
    {
      name: 'client-ssr',
      script: 'packages/client/dist-server/server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
}
