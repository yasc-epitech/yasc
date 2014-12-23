'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TagSchema = new Schema({
  name: String,
  genre: { type: Schema.ObjectId, ref: 'GenreSchema'}
});

module.exports = mongoose.model('Tag', TagSchema);
