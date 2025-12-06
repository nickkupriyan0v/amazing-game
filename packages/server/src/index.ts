import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
import express from 'express'
import { createClientAndConnect } from './db'
import router from './routers/routes'

const app = express()
app.use(
  cors({
    origin: 'http://localhost:3010',
    credentials: true,
  })
)
app.use(express.json())
const port = Number(process.env.SERVER_PORT) || 3005

createClientAndConnect()
app.use('/api', router)
app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
