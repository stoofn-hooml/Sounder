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
import Image from 'react-bootstrap/lib/Image.js';
import EmbedSong from './EmbedSong.js';

const UsernameRow = styled(Row)`
  color: #ff7700;
  font-size: 24px;
  padding: 0;
`;

const UserDetailRow = styled(Row)`
  font-weight: bold;
`;

function UserDetail(props){
  return (


    <Grid >
      <Row>
        <Col lg={2} sm={2} >
          <Image src={props.currentLogin.profilePictureURL}  circle bsStyle="margin:10px;" width="114px" height="114px" />
        </Col>
        <Col lg={7} sm={3} >
          <Grid>
            <UsernameRow >{props.currentLogin['username']}</UsernameRow>
            <UserDetailRow >Genre: {props.currentLogin['genre']}</UserDetailRow>
            <UserDetailRow >Karma Rating: {props.currentLogin['karma']}</UserDetailRow>
            <UserDetailRow >Followers: {props.currentLogin['numFollowers']}</UserDetailRow>
            <UserDetailRow >see more:  {props.currentLogin['profileURL']}</UserDetailRow>
          </Grid>
        </Col>
        </Row>
        <Col lg={9}>
        <EmbedSong songURL={props.currentLogin.song1} ></EmbedSong>
        <EmbedSong songURL={props.currentLogin.song2}></EmbedSong>
        <EmbedSong songURL={props.currentLogin.song3}></EmbedSong>
        </Col>
    </Grid>


  );
};


export default UserDetail;
