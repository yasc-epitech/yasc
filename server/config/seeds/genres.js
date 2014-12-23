'use strict';


var Gender = require('../../api/gender/gender.model');


Gender.find({}).remove(function() {
  Gender.create({
    name: 'Post-rock'
  }, {
    name: 'Hip-Hop'
  }, function() {
    console.log('Finished populating genres');
  });
});
