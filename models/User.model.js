const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username required'],
      minlength: [3, 'Username must be at least 3 characters'],
      unique: true
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'email required'],
      set: value => value.toLowerCase(),
      unique: true,

    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      default: 'https://i.stack.imgur.com/l60Hf.png'
    },

    role: {
      type: String,
      required: true,
      enum: ["Trainer", "Leader", "Admin"],
      default: "Trainer"
    }
  },
  {
    timestamps: true
  }
)

const User = model("User", userSchema)

module.exports = User
