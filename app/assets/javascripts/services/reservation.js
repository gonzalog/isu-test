reservationsServices.factory('Reservation', ['Server', (Server) => {
    return {
      getAll: params => Server.GET('/reservations', params),
      get: id => Server.GET(`/reservation/${id}`),
      update: (id, data) => Server.PUT(`/reservation/${id}`, { data }),
      create: (data) => Server.POST(`/reservations`, { data }),
      isReadyToSave: (reservation) => {
        let isPresentIn = entity => field => !!entity[field];

        let contactReady = ['name', 'phone', 'birthdate', 'type_id'].every(isPresentIn(reservation.contact));
        let reservationReady = ['description'].every(isPresentIn(reservation));

        console.log(contactReady, reservationReady)

        return contactReady && reservationReady;
      }
    }
  }]);
