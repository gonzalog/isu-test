reservationsServices.factory('Reservation', ['Server', (Server) => {
    return {
      getAll: params => Server.GET('/reservations', { params }),
      get: id => Server.GET(`/reservation/${id}`),
      update: (id, params) => Server.PUT(`/reservation/${id}`, { params }),
      create: (params) => Server.POST(`/reservations`, { params })
    }
  }]);
