reservationsDirectives.directive('navigation', () => {
  return {
    restrict: 'E',
    scope: {
      resource: '=',
      onPageClick: '&'
    },
    controller: ['$scope', ($scope) => {
      $scope.beginningPages = () => [1, 2, 3].filter(page => page < $scope.resource.current_page)
      $scope.endPages = () => [
        $scope.resource.total_pages - 2,
        $scope.resource.total_pages - 1,
        $scope.resource.total_pages
      ].filter(page => page > $scope.resource.current_page)

      $scope.hidingPagesBefore = () => {
        if (!$scope.resource.prev_page) {
          return false;
        }

        if ($scope.inLastPage()) {
          return $scope.resource.prev_page > 5;
        } else {
          return $scope.resource.prev_page > 4;
        }
      }

      $scope.hidingPagesAfter = () => {
        if (!$scope.resource.next_page) {
          return false;
        }

        if ($scope.inFirstPage()) {
          return $scope.resource.next_page < ($scope.resource.total_pages - 4);
        } else {
          return $scope.resource.next_page < ($scope.resource.total_pages - 3);
        }
      }

      $scope.inLastPage = () => $scope.resource.current_page === $scope.resource.total_pages;

      $scope.inFirstPage = () => $scope.resource.current_page === 1;
    }],
    template: `
      <nav aria-label="Navigation">
        <ul class="pagination justify-content-center">

          <li class="page-item">
            <button
              class="page-link"
              aria-label="Previous"
              ng-disabled="!resource.prev_page"
              ng-click="onPageClick({ page: resource.prev_page })">
              <span aria-hidden="true">
                <i class="fas fa-angle-left"></i>
              </span>
              <span class="sr-only">Previous</span>
            </button>
          </li>

          <li class="page-item" ng-repeat="page in beginningPages()">
            <button class="page-link" ng-click="onPageClick({ page: page })">
              {{ page }}
            </button>
          </li>

          <li ng-if="hidingPagesBefore()" class="pagination-elipsis">
            ...
          </li>

          <li class="page-item" ng-if="resource.prev_page > 4 && inLastPage()">
            <button class="page-link"  ng-click="onPageClick({ page: resource.prev_page - 1 })">
              {{ resource.prev_page - 1 }}
            </button>
          </li>

          <li class="page-item" ng-if="resource.prev_page > 3">
            <button class="page-link"  ng-click="onPageClick({ page: resource.prev_page })">
              {{ resource.prev_page }}
            </button>
          </li>

          <li class="page-item active">
            <button class="page-link">
              {{ resource.current_page }}
              <span class="sr-only">
                (current)
              </span>
            </button>
          </li>

          <li class="page-item" ng-if="resource.next_page && (resource.next_page < (resource.total_pages - 2))">
            <button class="page-link" ng-click="onPageClick({ page: resource.next_page })">
              {{ resource.next_page }}
            </button>
          </li>

          <li class="page-item" ng-if="(resource.total_pages > 5) && inFirstPage()">
            <button class="page-link" ng-click="onPageClick({ page: resource.next_page })">
              {{ resource.next_page + 1 }}
            </button>
          </li>

          <li ng-if="hidingPagesAfter()" class="pagination-elipsis">
            ...
          </li>

          <li class="page-item" ng-repeat="page in endPages()">
            <button class="page-link" ng-click="onPageClick({ page: page })">
              {{ page }}
            </button>
          </li>

          <li class="page-item">
            <button
              class="page-link"
              aria-label="Next"
              ng-disabled="!resource.next_page"
              ng-click="onPageClick({ page: resource.next_page })">
              <span aria-hidden="true">
                <i class="fas fa-angle-right"></i>
              </span>
              <span class="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    `
  };
});
