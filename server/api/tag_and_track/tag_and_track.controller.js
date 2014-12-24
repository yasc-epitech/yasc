/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /tag_and_tracks              ->  index
 * POST    /tag_and_tracks              ->  create
 * GET     /tag_and_tracks/:id          ->  show
 * PUT     /tag_and_tracks/:id          ->  update
 * DELETE  /tag_and_tracks/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Tag_and_track = include('api/tag_and_track//tag_and_track.model');

// Get list of tag_and_tracks
exports.index = function(req, res) {
  Tag_and_track.find(function (err, tag_and_tracks) {
    if(err) { return handleError(res, err); }
    return res.json(200, tag_and_tracks);
  });
};

// Get a single tag_and_track
exports.show = function(req, res) {
  Tag_and_track.findById(req.params.id, function (err, tag_and_track) {
    if(err) { return handleError(res, err); }
    if(!tag_and_track) { return res.send(404); }
    return res.json(tag_and_track);
  });
};

// Creates a new tag_and_track in the DB.
exports.create = function(req, res) {
  Tag_and_track.create(req.body, function(err, tag_and_track) {
    if(err) { return handleError(res, err); }
    return res.json(201, tag_and_track);
  });
};

// Updates an existing tag_and_track in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Tag_and_track.findById(req.params.id, function (err, tag_and_track) {
    if (err) { return handleError(res, err); }
    if(!tag_and_track) { return res.send(404); }
    var updated = _.merge(tag_and_track, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, tag_and_track);
    });
  });
};

// Deletes a tag_and_track from the DB.
exports.destroy = function(req, res) {
  Tag_and_track.findById(req.params.id, function (err, tag_and_track) {
    if(err) { return handleError(res, err); }
    if(!tag_and_track) { return res.send(404); }
    tag_and_track.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
