var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuSchema = new Schema({
  name: String,
  items: Object,
  createdAt: Date,
});
 
module.exports = mongoose.model('menu', menuSchema);