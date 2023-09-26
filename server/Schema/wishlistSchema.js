const mongoose = require('mongoose')
const Wishlist = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "must provide email"],
  },
  crypto_id:{
    type: String,
  }
});

module.exports = mongoose.model('wishlist', Wishlist)