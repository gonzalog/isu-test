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

    let favoritesLoading = {};
    $scope.onFavoriteClick = (reservation) => {
      if (!favoritesLoading[reservation.id]) {
        favoritesLoading[reservation.id] = true;
        Reservation.update({
          id: reservation.id,
          favorite: !reservation.favorite
        }).then(({ favorite }) => {
          favoritesLoading[reservation.id] = false;
          reservation.favorite = favorite;
        });
      }
    }

  }]);
