'use strict';


var Track = include('api/track/track.model');
var User = include('api/user/user.model');


// MongoDB doesn't support synchronous queries, so we have to first get the
// user and then feed it to our track object.

User.findOne({ email: 'john.doe@yasc.com' }, function(error, user) {
  Track.create({
    title:       'Musique de fou',
    description: 'description track 1',
    url:         'http://soundcloud.com/forss/flickermood',
    artwork_url: 'http://posey.com/artwork_url',
    duration:    240,
    author:      'Anakin',
    user:        user._id
  }, {
    title:       'Dou-double Poney Swag',
    description: 'description track 2',
    url:         'http://soundcloud.com/forss/flickermood',
    artwork_url: 'http://posey.com/artwork_url',
    duration:    180,
    author:      'Dark Vador',
    user:        user._id
  });
});
console.log('Finished populating tracks');
