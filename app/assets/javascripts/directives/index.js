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
