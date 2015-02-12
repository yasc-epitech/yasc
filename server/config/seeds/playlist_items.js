/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Playlist = require('../../api/playlist/playlist.model');
var Track = require('../../api/track/track.model');
var PlaylistItem = require('../../api/playlist_item/playlist_item.model');



var playlist_1 = Playlist.findOne({ title: 'Chill' }, function(error, playlist) {
return playlist;
});
var playlist_2 = Playlist.findOne({ title: 'Melodic' }, function(error, playlist) {
return playlist;
});
var track_1 = Track.findOne({ url: '68571849' }, function(error, track) {
return track;
});
var track_2 = Track.findOne({ url: '58706008' }, function(error, track) {
return track;
});

PlaylistItem.find({}).remove(function() {
  PlaylistItem.create({
    playlist:  playlist_1._id,
    track:  track_1._id
  }, {
    playlist:  playlist_2._id,
    track:  track_2._id
  }, function() {
    console.log('Finished populating playlist_items');
  });
});
