'use strict';


const trips = (state=[], action) => {
  switch (action.type) {
    case 'TRIP_LIKE':
      return state.map(trip => {
        if (trip.id == action.id) {
          trip.likes = trip.likes ? trip.likes + 1: 1;
        }
        return trip;
      });
    default:
      return state;
  }
};

export default trips;
