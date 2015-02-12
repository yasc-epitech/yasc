'use strict';


var Track = require('../../api/track/track.model');
var User = require('../../api/user/user.model');


// MongoDB doesn't support synchronous queries, so we have to first get the
// user and then feed it to our track object.

User.findOne({ email: 'admin@admin.com' }, function(error, user) {
  Track.create({
    title:       'Booba - Wesh Morray',
    description: 'Bah ouais Morray',
    url:         '68571849',
    artwork_url: '',
    duration:    -1,
    author:      'heaton-karafi'
  }, {
    title:       'Savant - Starfish',
    description: '',
    url:         '58706008',
    artwork_url: '',
    duration:    -1,
    author:      'aleksander-vinter'
  });
});
console.log('Finished populating tracks');
