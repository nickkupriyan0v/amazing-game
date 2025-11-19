import fs from 'node:fs/promises'
import express, { Request, Response } from 'express'
import type { ViteDevServer } from 'vite'

const isProduction = process.env.NODE_ENV === 'production'
const port: number = Number(process.env.PORT) || 5176
const base: string = process.env.BASE || '/'

let templateHtml = ''

if (isProduction) {
  templateHtml = await fs.readFile('./dist/index.html', 'utf-8')
}

const app = express()

let vite: ViteDevServer | undefined

if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
} else {
  const compression = (await import('compression')).default
  const sirv = (await import('sirv')).default
  app.use(compression())
  app.use(base, sirv('./dist', { extensions: [] }))
}

app.use(/.*/, async (req: Request, res: Response) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let template: string
    let render: (url: string) => Promise<{ html: string; head?: string }>

    if (!isProduction) {
      template = await fs.readFile('index.html', 'utf-8')
      template = await vite!.transformIndexHtml(url, template)

      const mod = await vite!.ssrLoadModule('/src/entry-server.tsx')
      render = mod.render
    } else {
      template = templateHtml
      const mod = (await import('../dist/server/entry-server.js')) as {
        render: (url: string) => Promise<{ html: string; head?: string }>
      }
      render = mod.render
    }

    const rendered = await render(url)

    const html = template
      .replace('<!--app-head-->', rendered.head ?? '')
      .replace('<!--app-html-->', rendered.html ?? '')

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } catch (e) {
    if (vite && e instanceof Error) {
      vite?.ssrFixStacktrace?.(e)
      console.error(e)
      res.status(500).end(e.stack)
    } else {
      console.error('Неизвестный тип')
      res.status(500).end('Ошибка')
    }
  }
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
