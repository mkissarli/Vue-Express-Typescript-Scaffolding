var mongoose = require("mongoose");

var user_schema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
});

var user_model = mongoose.model("user", user_schema);

export default user_model;
