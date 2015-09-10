var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  title: String,
  slug: String,
  description: String,
  author: Number,
  type: String,
  visibility: String,
  status: String,
  modifiedAt: Date,
  createdAt: Date,
});
 
module.exports = mongoose.model('posts', postSchema);