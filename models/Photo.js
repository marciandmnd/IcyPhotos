var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_v388z7qx:nim5f96lkkcbnp28t2nid33h0l@ds115798.mlab.com:15798/heroku_v388z7qx');

var schema = new mongoose.Schema({
  name: String,
  path: String
});

module.exports = mongoose.model('Photo', schema);