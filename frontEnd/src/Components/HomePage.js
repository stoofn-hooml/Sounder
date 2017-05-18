/*
  HomePage.js

  This provides the implementation for the Home Page component.

  HomePage does not maintain its own state.

  HomePage takes in five props: setMode, setLogout, currentLogin, clickMatch, matchlist.
  -currentLogin is an object that stores the account information
  for the person who is currently logged in, this will be passed into the functional component UserDetail.
  -clickMatch is a callback function to be passed in as props to the functional component MatchLog
  -matchlist is an array of objects that needs to be passed into the functional component Matchlog.

  HomePage uses two other functional components: UserDetail and MatchLog. UserDetail represents the user
  profile of whoever is currently logged in. MatchLog represents the list of Artists currentLogin has already matched with.

*/


import React from 'react';
import UserDetail from './UserDetail.js';
import MatchLog from './MatchLog.js';
import Grid from 'react-bootstrap/lib/Grid.js';
import Row from 'react-bootstrap/lib/Row.js';
import Col from 'react-bootstrap/lib/Col.js';
import '../index.css';

function HomePage(props) {
  return (
    <Grid>
      <Row bsClass="topRow">
        <Col lg={9} md={9} sm={9}>
          <UserDetail currentLogin={props.currentLogin} />
        </Col>
        <Col lg={3} md={3} sm={3}>
          <MatchLog matchlist={props.matchlist} clickMatch={(match)=>props.clickMatch(match)} matchTimes={props.matchTimes}/>
        </Col>
      </Row>
    </Grid>

  )

}

export default HomePage;
