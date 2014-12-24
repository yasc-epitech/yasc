'use strict';


var Playlist = include('api/playlist/playlist.model');
var User = include('api/user/user.model');


Playlist.find({}).remove(function() {
  Playlist.create({
    title: 'Chill',
    user:  User.findOne({email: 'test@ŧest.com'})._id
  }, {
    title: 'Melodic',
    user:  User.findOne({email: 'test@ŧest.com'})._id
  }, function() {
      console.log('Finished populating playlists');
  });
});
