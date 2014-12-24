'use strict';

var User = include('api/user/user.model');


User.find({}).remove(function() {
  User.create({
    provider:  'local',
    name:      'Test User',
    email:     'test@test.com',
    password:  'test'
  }, {
    provider:  'local',
    role:      'admin',
    name:      'Admin',
    email:     'admin@admin.com',
    password:  'admin'
  }, function() {
    console.log('Finished populating users');
  });
});
