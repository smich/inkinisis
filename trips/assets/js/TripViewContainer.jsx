'use strict';

import React from 'react';

import NavLink from '../../../assets/js/base/NavLink.jsx';


const TripView = function({id}) {
  return (
    <div className="trip">
        <NavLink to="/trips">My Trips</NavLink> / #{id}
        <h2>#MY_TRIP #{id}</h2>
        <p>
          More info goes here...
        </p>
      </div>
  );
};

const TripViewContainer = function(props) {
  return (
    <TripView id={props.params.id} />
  );
};
TripViewContainer.defaultProps = {};
TripViewContainer.propTypes = {};

export { TripViewContainer as default };