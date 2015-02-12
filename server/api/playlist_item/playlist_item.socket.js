/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var PlaylistItem = require('./playlist_item.model');

exports.register = function(socket) {
  PlaylistItem.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  PlaylistItem.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('playlist_item:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('playlist_item:remove', doc);
}