/*
UserDetail.js

UserDetail takes in one prop: currentLogin
-currentLogin is an object that stores the account information for the person who is currently logged in.

*/

import React, { Component } from 'react';
import styled from 'styled-components';
import Grid from 'react-bootstrap/lib/Grid.js';
import Row from 'react-bootstrap/lib/Row.js';
import Col from 'react-bootstrap/lib/Col.js';

function UserDetail(props){
  return (


    <Grid>
      <Row>
        <Col lg={4}>
        <img src="https://pbs.twimg.com/profile_images/503711643378155522/yi8jEioQ.jpeg" width="100%" height="100%" />
        </Col>
        <Col lg={8}>
          <Grid>
            <Row>{props.currentLogin['username']}</Row>
            <Row>Genre: {props.currentLogin['genre']}</Row>
            <Row>Karma Rating: {props.currentLogin['karma']}</Row>
            <Row>Followers: {props.currentLogin['numFollowers']}</Row>
            <Row>see more:  {props.currentLogin['profileURL']}</Row>
          </Grid>
        </Col>
        </Row>
        <Col lg={12}>
          {props.currentLogin['songs'][0]}
          {props.currentLogin['songs'][1]}
          {props.currentLogin['songs'][2]}
        </Col>
    </Grid>


  );
};


export default UserDetail;
