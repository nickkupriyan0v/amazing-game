import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import { createClientAndConnect } from './db'
import { authMiddleware } from './middleware/auth'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(authMiddleware)

const port = Number(process.env.SERVER_PORT) || 3001

createClientAndConnect()

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
