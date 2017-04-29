/*
  MatchDetailPage.js

  This provides the implementation for the Match Detail Page component.

  MatchDetailPage does not maintain its own state.

  MatchDetailPage takes in four props: clickMatch, matchlist, currentMatch, setMode
  -clickMatch is a callback function to be passedin as props to the functional component MatchLog.
  -matchlist is an array of objects that needs to be passed into the functional component.
  -currentMatch is the current profile being displayed in MatchDetailPage
  -setMode is a callback that updates the state of mode in App.js.


  MatchDetailPage uses two other functional components: UserDetail and MatchLog. UserDetail represents the user
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




function MatchDetailPage(props){

    return (
      <Grid>
        <Row bsClass="topRow">
          <Col lg={3}>
            <MatchLog clickMatch={(match)=>props.clickMatch(match)} matchlist={props.matchlist} />
          </Col>
          <Col lg={9}>
            <UserDetail currentLogin={props.currentMatch} profileLink={props.currentMatch.profileURL}/>
          </Col>
        </Row>
      </Grid>
    )

}


export default MatchDetailPage;
