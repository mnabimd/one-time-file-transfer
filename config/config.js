module.exports = {
  development: {
      username: 'root',
      password: null,
      database: 'transfer_api',
      host: "127.0.0.1",
      dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: null,
    database: 'transfer_api',
    host: "127.0.0.1",
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql"
  }
}
