'use strict';


var Track = require('../../api/track/track.model');
var User = require('../../api/user/user.model');


// MongoDB doesn't support synchronous queries, so we have to first get the
// user and then feed it to our track object.

User.findOne({ email: 'john.doe@yasc.com' }, function(error, user) {
var user = user;
Track.find({}).remove(function() {
  Track.create({
    title:       'Booba - Wesh Morray',
    description: 'Bah ouais Morray',
    url:         '68571849',
    artwork_url: '',
    duration:    -1,
    author:      'heaton-karafi',
    user: user._id
  }, {
    title:       'Savant - Starfish',
    description: '',
    url:         '58706008',
    artwork_url: '',
    duration:    -1,
    author:      'aleksander-vinter',
    user: user._id
  })});
});
console.log('Finished populating tracks');
