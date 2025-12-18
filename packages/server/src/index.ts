import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import { createClientAndConnect } from './db'
import router from './routers/routes'
dotenv.config()

const app = express()
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)
app.use(express.json())
const port = Number(process.env.SERVER_PORT) || 3001
// app.use(cookieParser())
// app.use(authMiddleware)

createClientAndConnect()
app.use('/api', router)
app.get('/', (_, res) => {
  res.json('👋 Привет сервер :)')
})
app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
