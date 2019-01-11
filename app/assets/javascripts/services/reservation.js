reservationsServices.factory('Reservation', ['Server', 'Contact', (Server, Contact) => {
    return {
      getAll: params => Server.GET('/reservations', { params }),
      get: id => Server.GET(`/reservations/${id}`),
      update: (data) => Server.PUT(`/reservations/${data.id}`, { data }),
      create: (data) => Server.POST(`/reservations`, { data }),
      isReadyToSave: (reservation) => {
        let isPresentIn = entity => field => !!entity[field];

        let contactReady = Contact.isReadyToSave(reservation.contact);
        let reservationReady = ['description', 'date'].every(isPresentIn(reservation));

        return contactReady && reservationReady;
      }
    }
  }]);
