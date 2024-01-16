const mysql = require("mysql2");
const config = require("./config");

const connection = mysql.createConnection({
  host: config.db_mysql.HOST || "localhost",
  user: config.db_mysql.USER || "admin",
  password: config.db_mysql.PASSWORD || "admin@A1",
  database: config.db_mysql.DB || "test1",
  insecureAuth: false,
});

module.exports = connection;
