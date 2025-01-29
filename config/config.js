const config = {
  development: {
    username: 'postgres',
    password: 'password',
    database: 'scelloo-api',
    host: 'localhost',
    dialect: 'postgres',
    port: 5432,
    logging: false
  },

  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres'
  }
}

module.exports = config
