reservationsControllers.controller('ReservationsController', ['$scope', '$location', 'Sorting', 'Reservation',
  function($scope, $location, Sorting, Reservation) {
    Sorting.getAll().then(results => $scope.sortings = results)

    $scope.loadReservations = (page) => {
      Reservation.getAll({ page }).then((result) => {
        $scope.reservations = result;
      });
    }

    $scope.loadReservations(1);

    $scope.onEditClick = ({ id }) => $location.path(`/reservation/${id}`);

    $scope.formatDate = (date) => moment(date).format('dddd MMM D [at] h:mm:ss a');

    $scope.rankingChange = (id, ranking) => {
      Reservation.update({
        id: id,
        ranking: ranking
      })
    }
  }]);
