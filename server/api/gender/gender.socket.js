/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var gender = require('./gender.model');

exports.register = function(socket) {
  gender.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  gender.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('gender:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('gender:remove', doc);
}