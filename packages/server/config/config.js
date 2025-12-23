module.exports = {
  development: {
    username:'myuser',
    password:'changeme123',
    database:'myapp',
    host:'localhost',
    port:5432,
    dialect: 'postgres',
  },
  test: {
    username:'myuser',
    password:'changeme123',
    database:'myapp',
    host:'localhost',
    port:5432,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
  },
}
