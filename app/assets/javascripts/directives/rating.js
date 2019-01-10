reservationsDirectives.directive('rating', () => {
  return {
    restrict: 'E',
    scope: {
      ngModel: "=",
      ngChange: '&'
    },
    template: `
      <div class="rating-options">
        <i
          class="fas fa-star rating-option"
          ng-repeat="rating in ratings"
          ng-class="{ active: isActive(rating) }"
          ng-click="onClick(rating)"
          ng-mouseover="onHover(rating)"
          ng-mouseleave="onHoverEnd()"
        ></i>
      </div>
    `,
    controller: ['$scope', ($scope) => {
      $scope.ratings = [...Array(5).keys()].map(n => n + 1);

      $scope.isActive = rating => {
        if ($scope.currentUnderHover) {
          return rating <= $scope.currentUnderHover;
        } else {
          return rating <= $scope.ngModel;
        }
      };

      $scope.onClick = (rating) => {
        $scope.ngModel = rating;
        $scope.ngChange({ rating: $scope.ngModel });
      }

      $scope.onHover = (rating) => {
        $scope.currentUnderHover = rating;
      }

      $scope.onHoverEnd = () => {
        $scope.currentUnderHover = null;
      }
    }]
  };
});
