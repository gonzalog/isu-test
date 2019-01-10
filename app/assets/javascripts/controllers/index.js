//= require angular/angular

const reservationsControllers = angular.module('reservationsControllers', []);

reservationsControllers.controller('EditReservationController',
  ['$scope', 'Reservation', '$routeParams', 'Contact', '$rootScope', '$location', '$route', '$window',
  function($scope, Reservation, $routeParams, Contact, $rootScope, $location, $route, $window) {
    $scope.sectionTitle = "Edit Reservation";
    $scope.today = new Date();

    if ($rootScope.notificationMessage) {
      $scope.notificationMessage = $rootScope.notificationMessage;
      $rootScope.notificationMessage = null;
    }

    Reservation.get($routeParams.id).then((result) => {
      $scope.reservation = result;
      $scope.selectedContact = result.contact;
    })

    $scope.getContactSuggestions = () => {
      return Contact.suggestions($scope.searchText).then(({ items }) => items);
    }

    $scope.setSelectionAsContact = () => {
      if ($scope.selectedContact) {
        $scope.reservation.contact = $scope.selectedContact;
      } else {
        $scope.reservation.contact = {
          name: $scope.searchText
        };
      }
    };

    $scope.cleanContact = () => {
      if (!$scope.reservation.contact.id) {
        $scope.reservation.contact.name = $scope.searchText;
      }
    };

    Contact.getTypes().then(results => $scope.contactTypes = results)

    $scope.readyToSend = () => $scope.reservation && Reservation.isReadyToSave($scope.reservation) && !$scope.loading;

    $scope.onSendClick = () => {
      if ($scope.readyToSend()) {
        $scope.errorMessage = null;
        $rootScope.notificationMessage = null;
        $scope.loading = true;

        Reservation.update($scope.reservation).then((reservation) => {
          if (reservation && reservation.id) {
            $rootScope.notificationMessage = "Reservation updated.";
            $route.reload();
            $window.scrollTo(0, 0);
          } else {
            $scope.errorMessage = "Something went wrong.";
          }
        }, (errorResponse) => {
          if (errorResponse && errorResponse.data && errorResponse.data.error) {
            $scope.errorMessage = errorResponse.data.error;
          } else {
            $scope.errorMessage = "The reservation couldn't be updated.";
          }
        }).then(() => {
          $scope.loading = false;
        });
      }
    }
  }]);
