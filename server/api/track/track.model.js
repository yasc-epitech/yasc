'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var User = include('api/user/user.model');

var TrackSchema = new Schema({
  title: String,
  description: String,
  url: String,
  artwork_url: String,
  duration: Number,
  author: String,
  created_at: { type: Date, default: Date.now },
  user: { type : Schema.ObjectId , ref: 'User'}
});

TrackSchema.path('user').validate(function (value, respond){
  User.findById (value, function (err, user){
      if(err || !user) return respond(false);
      console.log(user._id);
      respond();
  });
},'User not found');

module.exports = mongoose.model('Track', TrackSchema);
