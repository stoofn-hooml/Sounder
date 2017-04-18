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
import Panel from 'react-bootstrap/lib/Panel.js';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup.js';
import Button from 'react-bootstrap/lib/Button.js';
import ListGroup from 'react-bootstrap/lib/ListGroup.js';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem.js';
import '../index.css';

const CenteredTitle=styled.h1`
  font-weight: bold;
  text-align: center;
  border-bottom: 2px solid #ff4b00;
`;

function MatchLog(props){
  const matchlog = (props.matchlist).map((user)=>{
    let name = user.username;
    return (<ListGroupItem key={name} value={name} onClick={()=>{console.log(user);props.clickMatch(user)}}>{name}</ListGroupItem>);
  });

  return (
    <Grid bsStyle="border: 1px solid black">
      <Row>
        <Col lg={2}><CenteredTitle>Matches</CenteredTitle></Col>
      </Row>
      <Row>
        <Col lg={2}>
          <ListGroup>{matchlog}</ListGroup>
        </Col>
      </Row>
    </Grid>
  );
};

export default MatchLog;
