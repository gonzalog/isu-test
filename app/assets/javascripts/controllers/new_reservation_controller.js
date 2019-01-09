reservationsControllers.controller('NewReservationController', ['$scope', '$location', 'Reservation', 'Contact',
  function($scope, $location, Reservation, Contact) {
    $scope.sectionTitle = "Create Reservation";

    $scope.reservation = {
      contact: {}
    };

    $scope.getContactSuggestions = () => {
      return Contact.suggestions($scope.searchText);
    }

    $scope.setSelectionAsContact = () => {
      $scope.reservation.contact = $scope.selectedContact;
    };

    $scope.cleanContact = () => {
      if ($scope.reservation.contact.id) {
        $scope.reservation.contact = {
          name: $scope.searchText
        };
      } else {
        $scope.reservation.contact.name = $scope.searchText;
      }
    };

    Contact.getTypes().then(results => $scope.contactTypes = results)

    $scope.readyToSend = () => Reservation.isReadyToSave($scope.reservation);

    $scope.onSendClick = () => {
      if ($scope.readyToSend()) {
        $scope.errorMessage = null;
        Reservation.create($scope.reservation).then((reservation) => {
          if (reservation && reservation.id) {
            $location.path(`/reservation/${reservation.id}`);
          } else {
            $scope.errorMessage = "Something went wrong";
          }
        }, (errorResponse) => {
          if (errorResponse.error) {
            $scope.errorMessage = errorResponse.error;
          } else {
            $scope.errorMessage = "The reservation couldn't be created.";
          }
        });
      }
    }
  }]);
