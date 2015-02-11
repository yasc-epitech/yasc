'use strict';

describe('Controller: TracksCtrl', function () {

  // load the controller's module
  beforeEach(module('yascApp'));
  beforeEach(module('socketMock'));

  var TracksCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($httpBackend, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/tracks')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    TracksCtrl = $controller('TracksCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
