/*
  HomePage.js

  This provides the implementation for the Home Page component.

  HomePage does not maintain its own state.

  HomePage takes in five props: setMode, setLogout,currentLogin, clickMatch, matchlist.
  -setMode is a callback that updates the state of mode in App.js.
  -setLogout is a function that updates the state of mode and currentLogin in App.js
  -currentLogin is an object that stores the account information
  for the person who is currently logged in, this will be passed into the functional component UserDetail.
  -clickMatch is a callback function to be passed
  in as props to the functional component MatchLog
  -matchlist is an array of objects that needs to be passed into the functional component Matchlog.

  HomePage uses two other functional components: UserDetail and MatchLog. UserDetail represents the user
  profile of whoever is currently logged in. MatchLog represents the list of Artists currentLogin has already matched with.

*/


import React, { Component } from 'react';
import styled from 'styled-components';
import UserDetail from './UserDetail.js';
import MatchLog from './MatchLog.js';
import Grid from 'react-bootstrap/lib/Grid.js';
import Row from 'react-bootstrap/lib/Row.js';
import Col from 'react-bootstrap/lib/Col.js';
import Button from 'react-bootstrap/lib/Button.js';


function HomePage(props) {

  return (
    <Grid>
      <Row>
        <Col lg={9}>
          <Row>
          <UserDetail currentLogin={props.currentLogin} />
          </Row>
          <Row>
            <Col lg={9}>
              <span>
                <Button onClick={()=>props.setLogout()}>Log Out</Button>
                <Button onClick={()=>props.setMode('matching')}> Start Matching</Button>
                <Button onClick={()=>props.setMode('settings')}> Edit Matching Settings</Button>
              </span>
            </Col>
          </Row>
        </Col>
        <Col lg={3}>
          <MatchLog matchlist={props.matchlist} clickMatch={(match)=>props.clickMatch(match)}/>
        </Col>
      </Row>
    </Grid>

  )

}

export default HomePage;
