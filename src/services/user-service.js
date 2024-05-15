const { UserModel } = require("../database/models/index.js")


class UserService {
  constructor() { }

  // create User
  async createUser(data) {
      const user = new UserModel(data);
      await user.save();
      return user;
  }

  // get user
  async getUser(email) {
    const user = await UserModel.findOne({ email: email });
    return user;
  }

}

module.exports = UserService;
