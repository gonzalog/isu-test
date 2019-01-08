reservationsControllers.controller('ReservationsController', ['$scope', 'Sorting',
  function($scope, Sorting) {
    Sorting.getAll().then(results => $scope.sortings = results)
  }]);
