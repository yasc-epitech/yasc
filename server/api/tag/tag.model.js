'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TagSchema = new Schema({
  name: String,
  gender: { type: Schema.ObjectId, ref: 'GenderSchema'}
});

module.exports = mongoose.model('Tag', TagSchema);
