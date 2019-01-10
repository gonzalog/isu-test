//= require angular/angular

const reservationsDirectives = angular.module('reservationsDirectives', []);

reservationsDirectives.directive('sectionHeader', () => {
  return {
    restrict: 'E',
    transclude: true,
    template: `
      <div class="row section-header">
        <div class="container">
          <ng-transclude></ng-transclude>
        </div>
      </div>
    `
  };
});

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
        $scope.ngChange()
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
