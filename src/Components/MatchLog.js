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




function MatchLog(props){
  const matchlog = (props.matchlist).map((user)=>{
    let name = user.username;
    return (<Row key={name} value={name} onClick={()=>{console.log(user);props.clickMatch(user)}}><Col>{name}</Col></Row>);
  });
  return (
    <Grid>
    <Row><Col> <h1> Matches</h1></Col> </Row>
    <Row><Col> <h4> Click on any Match to their profile!</h4></Col> </Row>
    {matchlog}
    </Grid>
  );
};

export default MatchLog;
