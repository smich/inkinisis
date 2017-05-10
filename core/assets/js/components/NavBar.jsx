'use strict';

import React from 'react';
import { Nav, Navbar, NavDropdown, NavItem, MenuItem } from 'react-bootstrap';


/**
 * The top navigation bar
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
export const INavBar = function(props) {
  const goto = (path) => {
    props.history.push(path);
  };
  return (
    <Navbar fixedTop inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Inkinisis</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={1} onClick={() => {goto('/trips/book');}}>Book a Trip</NavItem>
          <NavDropdown eventKey={2} title={<i className="fa fa-user"></i>} id="account-dropdown">
            <MenuItem eventKey={2.1} onClick={() => {goto('/dashboard');}}>Dashboard</MenuItem>
            <MenuItem eventKey={2.2} onClick={() => {goto('/trips');}}>My Trips</MenuItem>
            <MenuItem eventKey={2.3} onClick={() => {goto('/settings');}}>My Settings</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={2.4} onClick={() => {alert("@todo: Logout");}}>Logout</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export { INavBar as default };