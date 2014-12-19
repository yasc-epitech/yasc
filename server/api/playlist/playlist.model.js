'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PlaylistSchema = new Schema({
	user: { type: Schema.ObjectId, ref: 'UserSchema'},
  	title: String
});

module.exports = mongoose.model('Playlist', PlaylistSchema);