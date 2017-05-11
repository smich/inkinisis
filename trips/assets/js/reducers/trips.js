const trips = (state = [], action) => {
  switch (action.type) {
    case 'TRIP_LIKE':
      return state.map((trip) => {
        const a = trip.likes + 1;
        // @todo-revise
        // let newTrip = {...trip};
        // if (newTrip.id === action.id) {
        //   newTrip.likes = trip.likes ? trip.likes + 1 : 1;
        // }
        // return trip;
        return a;
      });
    default:
      return state;
  }
};

export default trips;
