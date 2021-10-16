const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
  Uid: { type: String, required: true },
  imagePath: { type: String, required: true },
});

module.exports = mongoose.model('Photos', photoSchema);
