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

// TODO: Change seeds so tracks' user will be set correctly
TrackSchema.path('user').validate(function (value, respond){

  console.log('display id of a track\'s user - start');
  console.log(value);
  console.log('display id of a track\'s user - end');
  User.findById (value, function (err, user){

      if(err || !user) return respond(false);
      console.log(user._id);
      respond();
  });
},'User not found');

module.exports = mongoose.model('Track', TrackSchema);
