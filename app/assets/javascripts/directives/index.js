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

reservationsDirectives.directive('contactsTable', () => {
  return {
    restrict: 'E',
    transclude: true,
    controller: ['$scope', 'Contact', ($scope, Contact) => {
      let currentParams = {
        page: 1
      };

      $scope.desc = {};

      let loadContacts = (params = {}) => {
        currentParams = {
          ...currentParams,
          ...params
        };
        Contact.getAll(currentParams).then((results) => {
          $scope.contacts = results;
        });
      }

      loadContacts();

      $scope.onPageClick = (page) => {
        loadContacts({ page });
      }

      $scope.onEditClick = (contact) => {
        $location.path(`/edit_contact/${contact.id}`);
      }

      $scope.formatDate = (date) => {
        return moment(date).format('D MMM, YYYY');
      }

      $scope.onColumnClick = (field) => {
        $scope.desc = { [field]: !$scope.desc[field] };
        loadContacts({ order_by: field, desc: $scope.desc[field] });
      }
    }],
    template: `
      <table class="table">
        <thead>
          <tr>
            <th class="col-header" scope="col" ng-click="onColumnClick('name')">
              Name
              <span ng-show="desc.name !== undefined">
                <i class="fas" ng-class="{ 'fa-sort-up': desc.name, 'fa-sort-down': !desc.name }"></i>
              </span>
              <span ng-hide="desc.name !== undefined">
                <i class="fas fa-sort"></i>
              </span>
            </th>
            <th class="col-header" scope="col" ng-click="onColumnClick('contact_type_id')">
              Type
              <span ng-show="desc.contact_type_id !== undefined">
                <i class="fas" ng-class="{ 'fa-sort-up': desc.contact_type_id, 'fa-sort-down': !desc.contact_type_id }"></i>
              </span>
              <span ng-hide="desc.contact_type_id !== undefined">
                <i class="fas fa-sort"></i>
              </span>
            </th>
            <th class="col-header" scope="col" ng-click="onColumnClick('phone')">
              Phone
              <span ng-show="desc.phone !== undefined">
                <i class="fas" ng-class="{ 'fa-sort-up': desc.phone, 'fa-sort-down': !desc.phone }"></i>
              </span>
              <span ng-hide="desc.phone !== undefined">
                <i class="fas fa-sort"></i>
              </span>
            </th>
            <th class="col-header" scope="col" ng-click="onColumnClick('birthdate')">
              Birthdate
              <span ng-show="desc.birthdate !== undefined">
                <i class="fas" ng-class="{ 'fa-sort-up': desc.birthdate, 'fa-sort-down': !desc.birthdate }"></i>
              </span>
              <span ng-hide="desc.birthdate !== undefined">
                <i class="fas fa-sort"></i>
              </span>
            </th>
            <th class="col-header" scope="col">
              Options
            </th>
          </tr>
        </thead>
        <tbody>
          <tr ng-repeat="contact in contacts.items">
            <td>
              {{ contact.name }}
            </td>
            <td>
              {{ contact.contact_type.description }}
            </td>
            <td>
              {{ contact.phone }}
            </td>
            <td>
              {{ formatDate(contact.birthdate) }}
            </td>
            <td>
              <button class="btn btn-primary" ng-click="onEditClick(contact)">
                EDIT
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <navigation resource="contacts" ng-if="contacts" on-page-click="onPageClick(page)"/>
    `
  };
});
