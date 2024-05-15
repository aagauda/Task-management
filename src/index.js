const express = require("express");
require("dotenv").config({ path: "./config/index.js" });
const cors = require("cors");
const { connectDb } = require("./database/connection/index.js");
const Routes = require("./routes/index.js");
let { PORT } = require("./config/index.js");
const app = express();

if (!PORT) PORT = 3000;

const StartServer = async () => {
  // connect the db.
  await connectDb();

  app.use(express.json({ limit: "1mb" }));
  app.use(cors());

  // routes
  app.use("/api", Routes);

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  }).on("error", (error) => {
    process.exit()
  })

}

StartServer();