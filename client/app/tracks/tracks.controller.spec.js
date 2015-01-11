'use strict';

describe('Controller: TracksCtrl', function () {

  // load the controller's module
  beforeEach(module('yascApp'));

  var TracksCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TracksCtrl = $controller('TracksCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
