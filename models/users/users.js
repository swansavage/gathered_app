const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  firstName: String,
  lastName: String,
  city: String,
  state: String,
  img: String,
  liked: Array
});



const User = mongoose.model('User', userSchema);

module.exports = User;
