'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var GenderSchema = new Schema({
  name: String
});

module.exports = mongoose.model('Gender', GenderSchema);