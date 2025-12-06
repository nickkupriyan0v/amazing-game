// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

module.exports = {
  development: {
    url: "postgresql://amazing:changeme@localhost:5432/amazing_db",
    dialect: 'postgres',
  },
  test: {
    url: "postgresql://amazing:changeme@localhost:5432/amazing_db",
    dialect: 'postgres',
  },
  production: {
    url: "postgresql://amazing:changeme@localhost:5432/amazing_db",
    dialect: 'postgres',
  },
}
