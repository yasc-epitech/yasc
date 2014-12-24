/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var playlist = include('api/playlist/playlist.model');

exports.register = function(socket) {
  playlist.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  playlist.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('playlist:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('playlist:remove', doc);
}
