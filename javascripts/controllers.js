'use strict';

/* Controllers */
function PlacesCtrl($scope, $timeout, Place) {
  $scope.searchPlace = function() {
  	if ($scope.search) {
      $scope.places = Place.query(function(){
        console.log($scope.places[0]);
        $scope.center = {
          lat: 10,
          lng: -64
        }
        $scope.zoom = 8;
      });
  	}
  }

  $scope.loadPlaces = function() {
    $scope.places = Place.query(function(){
      $timeout(function(){
        angular.forEach($scope.places, function(place, key){
          this.push(
            {
              latitude: place.geodata.latitude, 
              longitude: place.geodata.longitude,
              label: place.description,
              url: '',
              thumbnail: '',
              handler: function(){alert('Should be a nice popup with the following description: ' + place.description);}
            });
        }, $scope.markers);
      }, 0);
    });
  }

  $scope.findMe = function () {
    if ($scope.geolocationAvailable) {
      navigator.geolocation.getCurrentPosition(function (position) {

          $scope.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          $scope.zoom = 12;

          $scope.$apply();
        },
        function () {
        }
      );
    } 
  };  

  // default location
  $scope.center = {
    lat: 45,
    lng: -73
  };

  $scope.geolocationAvailable = navigator.geolocation ? true : false;
  $scope.zoom = 4;
  $scope.markers = [];

  //load all places
  $scope.loadPlaces();

  //center on user location
  $scope.findMe();
}
