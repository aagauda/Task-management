const mongoose = require("mongoose");
const { DB_URL } = require("../../config");

const connectDb = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { connection } = await mongoose.connect(DB_URL);
      console.log(
        `Database connected on port ${connection.port} on host ${connection.host}`
      );
      resolve("Database connected");
    } catch (e) {
      console.log(e);
      reject("DB error while connecting");
    }
  });
};

module.exports = { connectDb };