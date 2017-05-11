'use strict';

import React from 'react';
import { connect } from 'react-redux';

import tripLikeAC from './actions/index.js';
import NavLink from '../../../assets/js/base/NavLink.jsx';


const TripView = function({id, likes, onClickLike}) {
  return (
    <div className="trip">
        <NavLink to="/trips">My Trips</NavLink> / #{id}
        <h2>#MY_TRIP #{id}</h2>
        <p>
          More info goes here...
        </p>
        <p>
          #Likes: {likes}
        </p>
        <p>
          <a href="#" onClick={(evt) => {
            evt.preventDefault();
            onClickLike(id)
          }}>Click to like!</a>
        </p>
      </div>
  );
};

const mapStateToProps = (state, props) => {
  let trips = state.trips.filter(trip => {
    if (trip.id == props.params.id) {
      return trip;
    }
  });

  return {
    id: props.params.id
    , likes: trips.length ? trips[0].likes : 0
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClickLike: (id) => {
      dispatch(tripLikeAC(id))
    }
  } ;
};


const TripViewContainer = connect(
    mapStateToProps, mapDispatchToProps
  )(TripView);


export default TripViewContainer;