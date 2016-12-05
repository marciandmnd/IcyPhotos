var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var schema = new mongoose.Schema({
  name: String,
  path: String
});

module.exports = mongoose.model('Photo', schema);