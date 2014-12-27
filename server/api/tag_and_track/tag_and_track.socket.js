/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var tag_and_track = require('./tag_and_track.model');

exports.register = function(socket) {
  tag_and_track.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  tag_and_track.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('tag_and_track:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('tag_and_track:remove', doc);
}
