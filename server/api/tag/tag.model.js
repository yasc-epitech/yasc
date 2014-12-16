'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
/*
** Hugo - Add the tags' fields there
*/
var TagSchema = new Schema({
  name: String,
  // genre: { type: ObjectId, ref: 'TrackSchema' },
});

module.exports = mongoose.model('Tag', TagSchema);
