'use strict';

import React from 'react';

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


class TripListContainer extends React.Component {
  render() {
    let trips = [
      {
        id: 1
        , label: "First trip"
      }
      , {
        id: 2
        , label: "Second trip"
      }
      ,{
        id: 3
        , label: "Third trip"
      }
    ];
    return (
      <TripList trips={trips}/>
    );
  }
}

TripListContainer.defaultProps = {};
TripListContainer.propTypes = {};

export { TripListContainer as default};