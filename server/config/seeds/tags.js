'use strict';

var Gender = require('../../api/gender/gender.model');
var Tag = require('../../api/tag/tag.model');


Tag.find({}).remove(function() {
  Tag.create({
    name:   'Foobar',
    gender: Gender.findOne({ name: 'Post-rock' })._id
  }, {
    name:   '#IZI',
    gender: Gender.findOne({ name: 'Hip-Hop' })._id
  }, function() {
    console.log('Finished populating tags');
  });
});
