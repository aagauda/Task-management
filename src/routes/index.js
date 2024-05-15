const express = require("express");
const router = express.Router();
const { UsersController, TasksController } = require("../api");

// this is dictionary page of all the routes

router.get("/", (req, res) => {
  res.send("welcome to the routes");
});
router.use("/user", UsersController());
router.use("/task", TasksController());
module.exports = router;