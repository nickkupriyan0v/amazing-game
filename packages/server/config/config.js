module.exports = {
  development: {
    username: "myuser",
    password: "changeme123",
    database: "myapp",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  test: {
    username: "myuser",
    password: "changeme123",
    database: "myapp",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres"
  }
}
