const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubtaskSchema = new Schema({
  subject: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  status: {
    type: Boolean,
    required: false  // false means pending by default
  },
  deleted: {
    type: Boolean,
    default: false
  }
});

const TaskSchema = new Schema({
  subject: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  status: {
    type: Boolean,
    required: false  // false means pending by default
  },
  deleted: {
    type: Boolean,
    default: false
  },
  subtasks: [SubtaskSchema]
});

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    tasks: [TaskSchema]
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
