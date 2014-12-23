/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Tag = require('../api/tag/tag.model');
var Tag_and_track = require('../api/tag_and_track/tag_and_track.model');
var Track = require('../api/track/track.model');
var User = require('../api/user/user.model');


Tag_and_track.find({}).remove(function() {
  Tag_and_track.create({
    user:  Tag.findOne({ email: 'admin@admin.com' })._id,
    track:  Track.findOne({ email: 'admin@admin.com' })._id
  }, {
    user:  User.findOne({ email: 'admin@admin.com' })._id,
    track:  Tag.findOne({ email: 'admin@admin.com' })._id
  }, function() {
    console.log('Finished populating tag_and_tracks');
  });
});

