'use strict';

var _ = require('lodash');
var PlaylistItem = require('./playlist_item.model');

// Get list of playlist_items
exports.index = function(req, res) {
  PlaylistItem.find(function (err, playlist_items) {
    if(err) { return handleError(res, err); }
    return res.json(200, playlist_items);
  });
};

// Get a single playlist_item
exports.show = function(req, res) {
  PlaylistItem.findById(req.params.id, function (err, playlist_item) {
    if(err) { return handleError(res, err); }
    if(!playlist_item) { return res.send(404); }
    return res.json(playlist_item);
  });
};

// Creates a new playlist_item in the DB.
exports.create = function(req, res) {
  PlaylistItem.create(req.body, function(err, playlist_item) {
    if(err) { return handleError(res, err); }
    return res.json(201, playlist_item);
  });
};

// Updates an existing playlist_item in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  PlaylistItem.findById(req.params.id, function (err, playlist_item) {
    if (err) { return handleError(res, err); }
    if(!playlist_item) { return res.send(404); }
    var updated = _.merge(playlist_item, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, playlist_item);
    });
  });
};

// Deletes a playlist_item from the DB.
exports.destroy = function(req, res) {
  PlaylistItem.findById(req.params.id, function (err, playlist_item) {
    if(err) { return handleError(res, err); }
    if(!playlist_item) { return res.send(404); }
    playlist_item.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}