import dotenv from 'dotenv'
dotenv.config()
import express, { Request as ExpressRequest } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs/promises'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import serialize from 'serialize-javascript'
const port = process.env.PORT || 3010
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const clientPath = join(__dirname, '..')
const isDev = process.env.NODE_ENV === 'development'
async function createServer() {
  const app = express()
  let vite: ViteDevServer | undefined
  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    })
    app.use(vite.middlewares)
  } else {
    app.use(
      express.static(path.join(clientPath, 'dist/client'), { index: false })
    )
  }
  app.get('*', async (req, res, next) => {
    const url = req.originalUrl
    try {
      let render: (
        req: ExpressRequest
      ) => Promise<{ html: string; initialState: unknown }>
      let template
      if (vite) {
        template = await fs.readFile(
          path.resolve(clientPath, 'index.html'),
          'utf-8'
        )
        template = await vite.transformIndexHtml(url, template)
        render = (
          await vite.ssrLoadModule(
            path.join(clientPath, 'src/entry-server.tsx')
          )
        ).render
      } else {
        template = await fs.readFile(
          path.join(clientPath, 'dist/client/index.html'),
          'utf-8'
        )
        const pathToServer = path.join(
          clientPath,
          'dist/server/entry-server.js'
        )
        render = (await import(pathToServer)).render
      }
      const { html: appHtml, initialState } = await render(req)
      const html = template.replace(`<!--ssr-outlet-->`, appHtml).replace(
        `<!--ssr-initial-state-->`,
        `<script>window.APP_INITIAL_STATE = ${serialize(initialState, {
          isJSON: true,
        })}</script>`
      )
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (vite && e instanceof Error) {
        vite.ssrFixStacktrace(e)
      }
      next(e)
    }
  })
  app.listen(port, () => {
    console.log(`Client is listening on port: ${port}`)
  })
}
createServer()
