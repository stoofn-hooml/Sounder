/*
  NavBar.js

  This provides the implementation for the NavBar component.

  NavBar has one prop: setMode.
    -setMode is a callback function that determines which page we are looking at


*/

import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar.js';
import NavItem from 'react-bootstrap/lib/NavItem.js';
import Nav from 'react-bootstrap/lib/Nav.js';
import NavDropdown from 'react-bootstrap/lib/NavDropdown.js';
import MenuItem from 'react-bootstrap/lib/MenuItem.js';


function NavBar(props){
  return(
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">Sounder</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem onClick={()=>props.setMode('home')} eventKey={1} href="#">Home</NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem onClick={()=>{props.updateFutureMatches(); props.setMode('matching');}} eventKey={2} href="#">Start Matching</NavItem>
          <NavDropdown eventKey={3} title="Account" id="basic-nav-dropdown">
            <MenuItem onClick={()=>props.setMode('settings')} eventKey={3.1}>Settings</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3} href="/logout">Logout</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}


export default NavBar;
