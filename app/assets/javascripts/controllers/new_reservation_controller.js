reservationsControllers.controller('NewReservationController',
  ['$scope', '$location', 'Reservation', 'Contact', '$rootScope', '$window',
  function($scope, $location, Reservation, Contact, $rootScope, $window) {
    $scope.sectionTitle = "Create Reservation";
    $scope.today = new Date();
    let initialBirthdate = new Date($scope.today.getFullYear() - 21, $scope.today.getMonth(), $scope.today.getDate());

    $scope.reservation = {
      contact: {
        birthdate: initialBirthdate
      }
    };

    $scope.getContactSuggestions = () => {
      return Contact.suggestions($scope.searchText).then(({ items }) => items);
    }

    $scope.setSelectionAsContact = () => {
      if ($scope.selectedContact) {
        $scope.reservation.contact = $scope.selectedContact;
      } else {
        $scope.reservation.contact = {
          name: $scope.searchText,
          birthdate: initialBirthdate
        };
      }
    };

    $scope.cleanContact = () => {
      if (!$scope.reservation.contact.id) {
        $scope.reservation.contact.name = $scope.searchText;
      }
    };

    Contact.getTypes().then(results => $scope.contactTypes = results)

    $scope.readyToSend = () => Reservation.isReadyToSave($scope.reservation) && !$scope.loading;

    $scope.onSendClick = () => {
      if ($scope.readyToSend()) {
        $scope.errorMessage = null;
        $rootScope.notificationMessage = null;
        $scope.loading = true;

        Reservation.create($scope.reservation).then((reservation) => {
          if (reservation && reservation.id) {
            $rootScope.notificationMessage = "Reservation created.";
            $location.path(`/reservation/${reservation.id}`);
            $window.scrollTo(0, 0);
          } else {
            $scope.errorMessage = "Something went wrong.";
          }
        }, (errorResponse) => {
          if (errorResponse && errorResponse.data && errorResponse.data.error) {
            $scope.errorMessage = errorResponse.data.error;
          } else {
            $scope.errorMessage = "The reservation couldn't be created.";
          }
        }).then(() => {
          $scope.loading = false;
        });
      }
    }
  }]);
