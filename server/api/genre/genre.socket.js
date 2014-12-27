/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var genre = require('../../api/genre/genre.model');

exports.register = function(socket) {
  genre.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  genre.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('genre:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('genre:remove', doc);
}
