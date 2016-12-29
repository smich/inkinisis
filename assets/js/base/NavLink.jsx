'use strict';

import React from 'react';
import { Link } from 'react-router'


const NavLink = function(props) {
  return (
    <Link {...props} activeClassName="active" activeStyle={{color: 'green'}} />
  );
};

export { NavLink as default };