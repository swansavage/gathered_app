const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  city: {type: String, required: true},
  state: {type: String, required: true},
  img: String,
  liked: Array
});



const User = mongoose.model('User', userSchema);

module.exports = User;
