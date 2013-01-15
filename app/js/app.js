'use strict';


// Declare app level module which depends on filters, and services
angular.module('quietPlaces', ['mongolab', 'quietPlaces.filters', 'quietPlaces.services', 'quietPlaces.directives']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'partials/places.html', controller: PlacesCtrl});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);

angular.module('mongolab', ['ngResource']).
    factory('Place', function($resource) {
      var PLace = $resource('https://api.mongolab.com/api/1/databases' +
          '/quietplaces/collections/places/:id',
          { apiKey: '50d77e5ce4b078304a66df55' }, {
            update: { method: 'PUT' }
          }
      );
 
      Place.prototype.update = function(cb) {
        return Place.update({id: this._id.$oid},
            angular.extend({}, this, {_id:undefined}), cb);
      };
 
      Place.prototype.destroy = function(cb) {
        return Place.remove({id: this._id.$oid}, cb);
      };
 
      return Place;
    });