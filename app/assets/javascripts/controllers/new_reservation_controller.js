reservationsControllers.controller('NewReservationController', ['$scope', 'Reservation', 'Contact',
  function($scope, Reservation, Contact) {
    $scope.sectionTitle = "Create Reservation";

    $scope.getContactSuggestions = () => {
      return Contact.suggestions($scope.contactName);
    }
  }]);
