'use strict';

/* Controllers */
function PlacesCtrl($scope, $timeout, Place) {
  $scope.searchPlace = function() {
  	if ($scope.search) {
      $scope.places = Place.query(function(){
        console.log($scope.places[0]);
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
              handler: function(){
                $scope.showPlace(place);
              }
            });
        }, $scope.markers);
      }, 0);
    });
  }

  $scope.showPlace = function(place) {
    $scope.place = place;
    $scope.$apply();
    $('#placeModal').modal();
  }

  $scope.findMe = function () {
    if ($scope.geolocationAvailable) {
      navigator.geolocation.getCurrentPosition(function (position) {

          $scope.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          $scope.zoom = 16;

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

  $scope.quietness = [
    'You\'ll need earplugs!',
    'Not so quiet. Some disturbing noises.',
    'It\'s quiet but occasional noise can be heard.',
    'Very quiet.',
    'You can hear your own heartbeat.'
  ];

  //load all places
  $scope.loadPlaces();

  //center on user location
  $scope.findMe();
}
