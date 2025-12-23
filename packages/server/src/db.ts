import dotenv from 'dotenv'
dotenv.config()

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = process.env
import { Client } from 'pg'
import { Sequelize } from 'sequelize-typescript'
import { Topic } from './models/topic.model'
import { Comment } from './models/comment.model'
const { DATABASE_URL } = process.env

if (!DATABASE_URL) {
  throw new Error('❌ DATABASE_URL не найдено in .env')
}

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  models: [Topic, Comment],
})

export async function connectDb() {
  try {
    await sequelize.authenticate()
    console.log('Sequelize: база данных соединена')
  } catch (err) {
    console.error('❌ Sequelize: не удалось подключиться', err)
    throw err
  }
}

export const createClientAndConnect = async (): Promise<Client | null> => {
  try {
    const client = new Client({
      user: POSTGRES_USER,
      host: POSTGRES_HOST,
      database: POSTGRES_DB,
      password: POSTGRES_PASSWORD,
      port: Number(POSTGRES_PORT),
      connectionString: DATABASE_URL,
      ssl: false,
    })

    await client.connect()

    const res = await client.query('SELECT NOW()')
    console.log('PG Client подключён:', res.rows[0].now)

    client.end()
    return client
  } catch (e) {
    console.error('PG Client ошибка:', e)
    return null
  }
}
