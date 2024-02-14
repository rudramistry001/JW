module.exports = {
    HOST: 'localhost',
    PORT: '5432',
    USER: 'postgres',
    PASSWORD: 'sa123',
    DB: 'DATA_JW',
    dialect: 'postgres',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
}

