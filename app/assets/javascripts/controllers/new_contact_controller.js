reservationsControllers.controller('NewContactController',
  ['$scope', 'Contact', '$rootScope', '$location',
  function($scope, Contact, $rootScope, $location) {
    $scope.sectionTitle = "New Contact";
    $scope.today = new Date();

    if ($rootScope.notificationMessage) {
      $scope.notificationMessage = $rootScope.notificationMessage;
      $rootScope.notificationMessage = null;
    }

    $scope.contact = {};

    Contact.getTypes().then(results => $scope.contactTypes = results)

    $scope.readyToSend = () => Contact.isReadyToSave($scope.contact) && !$scope.loading;

    $scope.onSendClick = () => {
      if ($scope.readyToSend()) {
        $scope.errorMessage = null;
        $rootScope.notificationMessage = null;
        $scope.loading = true;

        Contact.create($scope.contact).then((contact) => {
          if (contact && contact.id) {
            $rootScope.notificationMessage = "Contact created.";
            $location.path(`/contact/${contact.id}`);
          } else {
            $scope.errorMessage = "Something went wrong.";
          }
        }, (errorResponse) => {
          if (errorResponse && errorResponse.data && errorResponse.data.error) {
            $scope.errorMessage = errorResponse.data.error;
          } else {
            $scope.errorMessage = "The contact couldn't be created.";
          }
        }).then(() => {
          $scope.loading = false;
        });
      }
    }
  }]);