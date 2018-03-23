const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const vendorSchema = new Schema({
  name: {type: String, required: true },
  contact: {
    email: String,
    facebook: String,
    twitter: String,
    website: String
  },
  category: String,
  about: String,
  location : {
    address: String,
    city: String,
    state: String,
    zip: Number
  }
});


// for running proximity searches
// vendorSchema.index({location: '2dsphere'});

const Vendor = mongoose.model('Vendor', vendorSchema);

module.exports = Vendor;
