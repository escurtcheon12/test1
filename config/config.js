const dotenv = require("dotenv");

const envFound = dotenv.config();
if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const config = {
  server: {
    port: process.env.PORT || 5001,
    hostname: process.env.HOSTNAME || "admin",
  },
  db_mysql: {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "admin",
    PASSWORD: process.env.DB_PASSWORD || "admin@A1",
    DB: process.env.DB_NAME || "test1",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};

module.exports = config;
