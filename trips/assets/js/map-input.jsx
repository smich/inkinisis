import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';

import {MAP_INPUT_PICKUP, MAP_INPUT_DESTINATION} from 'constants';


class MapInput extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    <input className="controls" type="text"
           placeholder={this.props.placeholder}
           ref={input => {this.pickupInput = input}}
           value={this.props.value} />
  }
}

MapControl.defaultProps = {
  onLocationChosen: () => {}
  , placeholder: "Type a location"
  , value: ""
};

MapControl.propTypes = {
  onLocationChosen: PropTypes.func
  , placeholder: PropTypes.string
  , value: PropTypes.string
};

module.exports = MapControl;