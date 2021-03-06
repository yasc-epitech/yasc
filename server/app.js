/**
 * Main application file
 */

'use strict';

// Some helpers for path computing
// Use:         include('api/thing/thing.model')
// Instead of:  require('/path/to/yasc/server/api/thing/thing.model')
global.absolute_path = function(path) {
  return __dirname + (typeof(path) === 'undefined' ? '' : path);
}
global.include = function(file) {
  return require(absolute_path('/' + file));
}

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if ( config.seedDB ) {
  require('./config/seed');
  require('./config/seeds/users');
  require('./config/seeds/things');
  require('./config/seeds/genres');
  require('./config/seeds/tags');
  require('./config/seeds/tracks');
  require('./config/seeds/playlists');
  require('./config/seeds/playlist_items');
}

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: (config.env === 'production') ? false : true,
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
