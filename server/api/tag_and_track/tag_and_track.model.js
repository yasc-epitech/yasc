'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Tag_and_trackSchema = new Schema({
  tag: { type: Schema.ObjectId, ref: 'TagSchema'},
  track: { type: Schema.ObjectId, ref: 'TrackSchema'}
});

module.exports = mongoose.model('Tag_and_track', Tag_and_trackSchema);
