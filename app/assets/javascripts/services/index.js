//= require angular/angular

const reservationsServices = angular.module('reservationsServices', []);

reservationsServices.factory('Server', ['$http',
  ($http) => {
    return {
      DELETE: (path) => {
        return $http({
          url: `${path}.json`,
          method: 'DELETE'
        })
      },
      GET: (path, args = {}) => {
        let params = {
          ...args.params
        };

        return $http({
          url: `${path}.json`,
          method: 'GET',
          params: params
        }).then(({ data }) => data)
      },
      PUT: (path, args = {}) => {
        let requestData = {
          ...args.data
        };

        return $http({
          url: `${path}.json`,
          method: 'PUT',
          data: requestData
        }).then(({ data }) => data)
      },
      POST: (path, args = {}) => {
        let requestData = {
          ...args.data
        };

        return $http({
          url: `${path}.json`,
          method: 'POST',
          data: requestData
        }).then(({ data }) => data)
      }
    }
  }]);

reservationsServices.factory('Contact', ['Server', (Server) => {
    return {
      getAll: params => Server.GET('/contacts', { params }),
      get: id => Server.GET(`/contacts/${id}`),
      update: (data) => Server.PUT(`/contacts/${data.id}`, { data }),
      delete: (id) => Server.DELETE(`/contacts/${id}`),
      create: (data) => Server.POST(`/contacts`, { data }),
      suggestions: function(query) {
        return this.getAll({ query });
      },
      getTypes: () => Server.GET('/contact_types'),
      isReadyToSave: contact => ['name', 'phone', 'birthdate', 'contact_type_id'].every(field => !!contact[field])
    }
  }]);
