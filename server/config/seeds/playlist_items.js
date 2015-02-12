/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Playlist = require('../../api/playlist/playlist.model');
var Track = require('../../api/track/track.model');
var PlaylistItem = require('../../api/playlist_item/playlist_item.model');


PlaylistItem.find({}).remove(function() {
  PlaylistItem.create({
    playlist:  Playlist.findOne({ title: 'Chill' })._id,
    track:  Track.findOne({ url: '68571849' })._id
  }, {
    playlist:  Playlist.findOne({ title: 'Melodic' })._id,
    track:  Track.findOne({ url: '58706008' })._id
  }, function() {
    console.log('Finished populating playlist_items');
  });
});