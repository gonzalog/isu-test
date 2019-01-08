//= require angular/angular

const reservationsControllers = angular.module('reservationsControllers', []);

reservationsControllers.controller('EditReservationController', ['$scope', 'Reservation', '$routeParams',
  function($scope, Reservation, $routeParams) {
    Reservation.get($routeParams.id).then(result => $scope.reservation = result)
  }]);
