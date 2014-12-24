'use strict';


var Track = include('api/track/track.model');


Track.find({}).remove(function() {
  Track.create({
    title:        'Musique de fou',
    description:  'description track 1',
    url:          'http://soundcloud.com/forss/flickermood',
    artwork_url:  'http://posey.com/artwork_url',
    duration:     240,
    author:       'Anakin',
    // user:         User.findOne({ email: 'admin@admin.com' })._id
  }, {
    title:        'LEL',
    description:  'description track 2',
    url:          'http://soundcloud.com/forss/flickermood',
    artwork_url:  'http://posey.com/artwork_url',
    duration:     180,
    author:       'Dark Vador',
    // user:         User.findOne({email: 'test@ŧest.com'})._id
  }, function() {
    console.log('Finished populating tracks');
  });
});
