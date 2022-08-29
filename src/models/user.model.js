const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true,'please enter a valid name'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true,'please enter a valid name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true,'please enter a valid email'],
      unique: true,
      alphanumeric: true,
      
    },
    password: {
      type: String,
      required: true,

    }, 

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey:false,

  }
);

module.exports = mongoose.model("User", userSchema);
