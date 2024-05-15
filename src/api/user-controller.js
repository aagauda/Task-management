const { UserService } = require("../services");
const router = require("express").Router();

module.exports = () => {
  const service = new UserService();

  router.post("/", async (req, res, next) => {
    try {
      const { name, email } = req.body;
      const user = await service.getUser(email);
      if (user) return res.status(404).json({
        error: "user already exists"
      });
      const data = await service.createUser({ name, email });
      return res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        error: error.message
      });
    }
  });

  return router;
};
