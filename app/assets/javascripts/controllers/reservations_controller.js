reservationsControllers.controller('ReservationsController', ['$scope',
  function($scope) {
    $scope.sortings = [
      {
        description: "By Date Ascending"
      },
      {
        description: "By Date Descending"
      },
      {
        description: "By Alphabetic Ascending"
      },
      {
        description: "By Alphabetic Descending"
      },
      {
        description: "By Ranking"
      }
    ];
  }]);
