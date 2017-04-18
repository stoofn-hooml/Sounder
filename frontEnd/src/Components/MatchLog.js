/*

MatchLog.js

MatchLog takes in 2 props: matchlist and clickMatch
-matchlist is an array of objects that store the acccount information
of the artists that currentLogin has matched with
-clickMatch is a callback function that updates the state of mode and currentMatch in App.js


*/


import React, { Component } from 'react';
import styled from 'styled-components';
import Grid from 'react-bootstrap/lib/Grid.js';
import Row from 'react-bootstrap/lib/Row.js';
import Col from 'react-bootstrap/lib/Col.js';
import Popover from 'react-bootstrap/lib/Popover.js';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger.js';
import Button from 'react-bootstrap/lib/Button.js';


const MatchName = styled(Button)`
  color: black;
  font-size: 18px;
  margin-top: 5px;
  curson: pointer;
  &:hover {
   color: #FF7700;
 }

`;

const MatchPreview = styled(Popover)`
  width: 400px;

`


function MatchLog(props){

  const matchlog = (props.matchlist).map((user)=>{
    let name = user.username;
    const popoverHoverFocus = (
    <MatchPreview id="popover-trigger-hover-focus" title={name}  positionLeft={200}
      positionTop={50}>
      <p><strong>Genre</strong> {user.genre}</p>
      <p><strong>Followers</strong> {user.numFollowers}</p>
      <p><strong>Karma</strong> {user.karma}</p>
    </MatchPreview>
  );
    return (
      <Row>
      <OverlayTrigger trigger={['hover', 'focus']} placement="right" overlay={popoverHoverFocus} arrowOffsetLeft='40px'>
        <MatchName key={name} value={name} onClick={()=>{console.log(user);props.clickMatch(user)}}><Col>{name}</Col></MatchName>
      </OverlayTrigger>
      </Row>
    );
  });
  return (
    <Grid>
    <Row><Col> <h1> Matches</h1></Col> </Row>
    <Row><Col> <h4> Click on an Artist to see their profile</h4></Col> </Row>
    {matchlog}
    </Grid>
  );
};

export default MatchLog;
