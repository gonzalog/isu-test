//= require angular/angular

const reservationsServices = angular.module('reservationsServices', []);

reservationsServices.factory('Server', ['$http',
  ($http) => {
    return {
      GET: (path, args = {}) => {
        let params = {
          ...args
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
          params: requestData
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
      get: id => Server.GET(`/contact/${id}`),
      update: (id, params) => Server.PUT(`/contact/${id}`, { params }),
      create: (params) => Server.POST(`/contacts`, { params }),
      suggestions: function(query) {
        return this.getAll({ query });
      },
      getTypes: () => Server.GET('/contact_types') 
    }
  }]);
