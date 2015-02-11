'use strict';


var Track = require('../../api/track/track.model');
var User = require('../../api/user/user.model');


// MongoDB doesn't support synchronous queries, so we have to first get the
// user and then feed it to our track object.

User.findOne({ email: 'admin@admin.com' }, function(error, user) {
  Track.create({
    title:       'Musique de fou',
    description: 'description track 1',
    url:         'http://soundcloud.com/forss/flickermood',
    artwork_url: 'http://posey.com/artwork_url',
    duration:    240,
    author:      'Anakin'
  }, {
    title:       'Dou-double Poney Swag',
    description: 'description track 2',
    url:         'http://soundcloud.com/forss/flickermood',
    artwork_url: 'http://posey.com/artwork_url',
    duration:    180,
    author:      'Dark Vador'
  });
});
console.log('Finished populating tracks');
