// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

export const development = {
  username: process.env.POSTGRES_USER || 'myuser',
  password: process.env.POSTGRES_PASSWORD || 'changeme123',
  database: process.env.POSTGRES_DB || 'myapp',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT || 5432,
  dialect: 'postgres',
}
export const test = {
  username: process.env.POSTGRES_USER || 'myuser',
  password: process.env.POSTGRES_PASSWORD || 'changeme123',
  database: process.env.POSTGRES_DB || 'myapp',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT || 5432,
  dialect: 'postgres',
}
export const production = {
  use_env_variable: 'DATABASE_URL',
  dialect: 'postgres',
}
