const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const config = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
};

module.exports = config;
