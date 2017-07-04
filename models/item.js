// Load required packages
var mongoose = require('mongoose');

// Define our item schema
var ItemSchema   = new mongoose.Schema({
  name: String,
  type: String,
  quantity: Number,
  userId: String
});

// Export the Mongoose model
module.exports = mongoose.model('Item', ItemSchema);