'use strict';


var Track = include('api/track/track.model');
var User = include('api/user/user.model');


// Track.find({}).remove(function() {
//   Track.create({
//     title:        'Musique de fou',
//     description:  'description track 1',
//     url:          'http://soundcloud.com/forss/flickermood',
//     artwork_url:  'http://posey.com/artwork_url',
//     duration:     240,
//     author:       'Anakin',
//     user:         User.findOne({ email: 'admin@admin.com' })._id
//   }, {
//     title:        'Dou-double Poney Swag',
//     description:  'description track 2',
//     url:          'http://soundcloud.com/forss/flickermood',
//     artwork_url:  'http://posey.com/artwork_url',
//     duration:     180,
//     author:       'Dark Vador',
//     user:         User.findOne({email: 'test@ŧest.com'})._id
//   }, function() {
//     console.log('Finished populating tracks');
//   });
// });

// MongoDB doesn't support synchronous queries, so we have to first get the
// user and then feed it to our track object.
// Note: it doesn't work either <= there are no user in the DB

User.findOne({ email: 'admin@admin.com' }, function(error, user) {
  console.log(error);
  console.log(user);
  Track.create({
    title:       'Musique de fou',
    description: 'description track 1',
    url:         'http://soundcloud.com/forss/flickermood',
    artwork_url: 'http://posey.com/artwork_url',
    duration:    240,
    author:      'Anakin',
    user:        user._id
  });
});

User.findOne({ email: 'admin@admin.com' }, function(error, user) {
  Track.create({
    title:       'Dou-double Poney Swag',
    description: 'description track 2',
    url:         'http://soundcloud.com/forss/flickermood',
    artwork_url: 'http://posey.com/artwork_url',
    duration:    180,
    author:      'Dark Vador',
    user:        user._id
  });
});
