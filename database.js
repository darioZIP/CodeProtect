//database.js
require('dotenv').config({ path: './protect.env' });

const dbConfig = {
  HOST: process.env.DB_HOST ,
  USERNAME: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  DB_LOGIN: process.env.DB_NAME,
};

module.exports = dbConfig;
