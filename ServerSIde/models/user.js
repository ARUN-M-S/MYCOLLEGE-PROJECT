const { string } = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  mail: { type: String, unique: true },
  firstname: { type: String },
  lastname:{type:String},
  password: { type: String },
  studentDetails:{}
}); 

module.exports = mongoose.model("user", userSchema);
