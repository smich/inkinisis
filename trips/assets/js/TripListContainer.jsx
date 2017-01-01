'use strict';

import React from 'react';
import { connect } from 'react-redux';

import NavLink from '../../../assets/js/base/NavLink.jsx';

const ListItem = function({id=-1, label, url}) {
  let listItem = url
    ? <NavLink to={url}>{label}</NavLink>
    : <span>{label}</span>;

  return (
    <li>{listItem}</li>
  )
};

const TripList = function(props) {
  let tripList = [];

  if (!props.trips) {
    tripList.push(<ListItem label="No trips" />);
  }

  tripList = props.trips.map(trip => {
    return <ListItem key={trip.id} id={trip.id} label={trip.label} url={`/trips/${trip.id}`} />;
  });

  return (
    <div className="my-trips">
      <h2>#MY_TRIPS</h2>
      <ul>
        {tripList}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    trips: state.trips ? state.trips : []
  };
};

const TripListContainer = connect(
  mapStateToProps
)(TripList);


export { TripListContainer as default};