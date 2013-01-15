'use strict';

/* Controllers */

function PlacesCtrl($scope, Place) {
  console.log($scope);
  $scope.places = Place.query();
}
