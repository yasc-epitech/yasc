/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var track = require('../../api/track/track.model');

exports.register = function(socket) {
  track.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  track.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('track:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('track:remove', doc);
}
