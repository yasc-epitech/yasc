/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /genders              ->  index
 * POST    /genders              ->  create
 * GET     /genders/:id          ->  show
 * PUT     /genders/:id          ->  update
 * DELETE  /genders/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Gender = require('./gender.model');

// Get list of genders
exports.index = function(req, res) {
  Gender.find(function (err, genders) {
    if(err) { return handleError(res, err); }
    return res.json(200, genders);
  });
};

// Get a single gender
exports.show = function(req, res) {
  Gender.findById(req.params.id, function (err, gender) {
    if(err) { return handleError(res, err); }
    if(!gender) { return res.send(404); }
    return res.json(gender);
  });
};

// Creates a new gender in the DB.
exports.create = function(req, res) {
  Gender.create(req.body, function(err, gender) {
    if(err) { return handleError(res, err); }
    return res.json(201, gender);
  });
};

// Updates an existing gender in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Gender.findById(req.params.id, function (err, gender) {
    if (err) { return handleError(res, err); }
    if(!gender) { return res.send(404); }
    var updated = _.merge(gender, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, gender);
    });
  });
};

// Deletes a gender from the DB.
exports.destroy = function(req, res) {
  Gender.findById(req.params.id, function (err, gender) {
    if(err) { return handleError(res, err); }
    if(!gender) { return res.send(404); }
    gender.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}