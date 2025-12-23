module.exports = {
  development: {
    url: "postgresql://myuser:changeme123@localhost:5432/myapp",
    dialect: 'postgres',
  },
  test: {
    url: "postgresql://myuser:changeme123@localhost:5432/myapp",
    dialect: 'postgres',
  },
  production: {
    url: "postgresql://myuser:changeme123@localhost:5432/myapp",
    dialect: 'postgres',
  },
}
