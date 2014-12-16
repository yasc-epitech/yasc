'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
/*
** Hugo - Add the songs' fields there
*/
var SongSchema = new Schema({
  name: String,
  url: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Song', SongSchema);
