reservationsServices.factory('Sorting', ['Server', (Server) => {
    return {
      getAll: () => Server.GET('/sortings')
    }
  }]);
