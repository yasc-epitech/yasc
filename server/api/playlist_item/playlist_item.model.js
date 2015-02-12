'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlaylistItemSchema = new Schema({
  playlist: { type: Schema.ObjectId, ref: 'PlaylistSchema'},
  track: { type: Schema.ObjectId, ref: 'TrackSchema'}
});

module.exports = mongoose.model('PlaylistItem', PlaylistItemSchema);