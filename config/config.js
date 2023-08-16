require("dotenv").config();
const fs = require("fs");

// const caCert = fs.readFileSync('cert.pem');

const {
  PROD_PORT,
  PROD_DB_HOST,
  PROD_DB_USERNAME,
  PROD_DB_PASSWORD,
  PROD_DB_NAME,
} = process.env;

module.exports = {
  development: {
    username: PROD_DB_USERNAME,
    password: PROD_DB_PASSWORD,
    database: PROD_DB_NAME,
    host: PROD_DB_HOST,
    port: PROD_PORT,
    dialect: "postgres",
    // dialectOptions: {
    //   ssl: {
    //     rejectUnauthorized: false,
    //     // ca: [caCert]
    //   },
    // },
  },
  // test: {
  //   username: "root",
  //   password: null,
  //   database: "database_test",
  //   host: "127.0.0.1",
  //   dialect: "postgres",
  // },
  production: {
    username: PROD_DB_USERNAME,
    password: PROD_DB_PASSWORD,
    database: PROD_DB_NAME,
    host: PROD_DB_HOST,
    port: PROD_PORT,
    dialect: "postgres",
    // },
  },
};