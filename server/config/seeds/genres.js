'use strict';


var Genre = require('../../api/genre/genre.model');


Genre.find({}).remove(function() {
  Genre.create({
    name: 'Post-rock'
  }, {
    name: 'Hip-Hop'
  }, function() {
    console.log('Finished populating genres');
  });
});
