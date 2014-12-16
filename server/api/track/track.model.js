'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
/*
** Hugo - Add the tracks' fields there
*/
var TrackSchema = new Schema({
  title: String,
  description: String,
  url: String,
  artwork_url: String,
  duration: Number,
  author: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Track', TrackSchema);
