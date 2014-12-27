/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /tracks              ->  index
 * POST    /tracks              ->  create
 * GET     /tracks/:id          ->  show
 * PUT     /tracks/:id          ->  update
 * DELETE  /tracks/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Track = require('./track.model');
var User = require('../../api/user/user.model');
var SoundCloudAPI = require("soundcloud-node");

// Get list of tracks
exports.index = function(req, res) {
  Track.find(function (err, tracks) {
    if(err) { return handleError(res, err); }
    return res.json(200, tracks);
  });
};

// Get a single track
exports.show = function(req, res) {
  Track.findById(req.params.id, function (err, track) {
    if(err) { return handleError(res, err); }
    if(!track) { return res.send(404); }
/*    console.log("test 1");


    var user = User.findById(track.user, function (err, user) {
      if(err) { return handleError(res, err); }
      if(!user) { return res.send(404); }
    console.log("test 2");
      return user;
    });
    console.log("trackest 3");*/
    return res.json(track);
  });
};

// Creates a new track in the DB.
exports.create = function(req, res) {
  Track.create(req.body, function(err, track) {
    if(err) { return handleError(res, err); }
    return res.json(201, track);
  });
};

// Updates an existing track in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Track.findById(req.params.id, function (err, track) {
    if (err) { return handleError(res, err); }
    if(!track) { return res.send(404); }
    var updated = _.merge(track, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, track);
    });
  });
};

// Deletes a track from the DB.
exports.destroy = function(req, res) {
  Track.findById(req.params.id, function (err, track) {
    if(err) { return handleError(res, err); }
    if(!track) { return res.send(404); }
    track.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
