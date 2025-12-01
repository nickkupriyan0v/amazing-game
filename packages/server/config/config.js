// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

module.exports = {
  development: {
    url: "postgresql://postgres:utorrent123@localhost:5432/forum?schema=public",
    dialect: 'postgres',
  },
  test: {
    url: "postgresql://postgres:utorrent123@localhost:5432/forum?schema=public",
    dialect: 'postgres',
  },
  production: {
    url: "postgresql://postgres:utorrent123@localhost:5432/forum?schema=public",
    dialect: 'postgres',
  },
}
