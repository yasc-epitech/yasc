'use strict';

var Genre = require('../../api/genre/genre.model');
var Tag = require('../../api/tag/tag.model');


Tag.find({}).remove(function() {
  Tag.create({
    name:   'Foobar',
    genre: Genre.findOne({ name: 'Post-rock' })._id
  }, {
    name:   '#IZI',
    genre: Genre.findOne({ name: 'Hip-Hop' })._id
  }, function() {
    console.log('Finished populating tags');
  });
});
