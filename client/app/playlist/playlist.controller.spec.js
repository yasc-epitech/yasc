'use strict';

describe('Controller: PlaylistCtrl', function () {

  // load the controller's module
  beforeEach(module('yascApp'));
  beforeEach(module('socketMock'));

  var PlaylistCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/playlists')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    PlaylistCtrl = $controller('PlaylistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of playlists to the scope', function () {
    $httpBackend.flush();
    expect(scope.playlists.length).toBe(4);
  });
});
