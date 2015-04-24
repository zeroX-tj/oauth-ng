'use strict';

var profileClient = angular.module('oauth.profile', [])

profileClient.factory('Profile', ['$http', 'AccessToken', '$rootScope', function($http, AccessToken, $rootScope) {
  var service = {};
  var profile;

  service.find = function(uri) {
    var promise = $http.get(uri, { headers: headers() });
    promise.success(function(response) {
        profile = response;
        $rootScope.$broadcast('oauth:profile', profile);
    });
    return promise;
  };

  service.get = function(uri) {
    return profile;
  };

  service.set = function(resource) {
    profile = resource;
    return profile;
  };

  service.logout = function(server, path){
      var promise = $http.delete(uri+path, { headers: headers() });
      promise.success(function(response) {
          $rootScope.$broadcast('oauth:destroyed');
          window.location.replace(server+'/logout');
      });
      return promise;
  }

  var headers = function() {
    return { Authorization: 'Bearer ' + AccessToken.get().access_token };
  };

  return service;
}]);
