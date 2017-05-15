import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar.js';
import NavItem from 'react-bootstrap/lib/NavItem.js';
import Nav from 'react-bootstrap/lib/Nav.js';
//import NavDropdown from 'react-bootstrap/lib/NavDropdown.js';
//import MenuItem from 'react-bootstrap/lib/MenuItem.js';


function WelcomeNavBar(props){
  return(
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">Sounder</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem onClick={()=>props.setMode('login')} eventKey={4} href="#">Sign In</NavItem>
          <NavItem onClick={()=>props.setMode('signUp')} eventKey={5}>Register</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default WelcomeNavBar;
