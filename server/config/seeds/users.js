'use strict';

var User = require('../../api/user/user.model');


var userTest = {
  provider: 'local',
  name:     'John Doe',
  email:    'john.doe@yasc.com',
  password: 'test'
}
var userAdmin = {
  provider: 'local',
  role:     'admin',
  name:     'Judge Dredd',
  email:    'judge.dredd@yasc.com',
  password: 'admin'
}

User.findOneOrCreate({email: 'john.doe@yasc.com'}, userTest, function(error, user) { });
User.findOneOrCreate({email: 'judge.dredd@yasc.com'}, userAdmin, function(error, user) { });
console.log('Finished populating users');
