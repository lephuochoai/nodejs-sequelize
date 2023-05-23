require('dotenv').config();

const pool = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000,
};

module.exports = {
  development: {
    host: process.env.DB_HOST || '127.0.0.1',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'lephuochoai',
    database: process.env.DB_NAME || 'testdb',
    dialect: 'mysql',
    pool,
    port: 3306,
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};
