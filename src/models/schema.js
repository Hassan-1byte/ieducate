const mongoose = require("mongoose");

const ieducateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    required: true,
  },
});

// Now we need to Create a Collection.

const ieducateCollection = new mongoose.model(
  "ieducateCollection",
  ieducateSchema
);
module.exports = ieducateCollection;
