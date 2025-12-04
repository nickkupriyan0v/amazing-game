import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import { createClientAndConnect } from './db'
import { authMiddleware } from './middleware/auth'

dotenv.config()

const app = express()
app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true, // Разрешаем отправку кук
  })
)

app.use(express.json())
app.use(authMiddleware)

const port = Number(process.env.SERVER_PORT) || 3001

createClientAndConnect()

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
