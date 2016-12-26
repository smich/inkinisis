import React from 'react';
import ReactDom from 'react-dom';

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
  onLocationChosen: React.propTypes.func
  , placeholder: React.PropTypes.string
  , value: React.PropTypes.string
};

module.exports = MapControl;