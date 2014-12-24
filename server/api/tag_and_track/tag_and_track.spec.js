'use strict';

var should = require('should');
var app = include('app');
var request = require('supertest');

describe('GET /api/tag_and_tracks', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/tag_and_tracks')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});
