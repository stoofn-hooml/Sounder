/*
  MatchPage.js

  This provides the implementation for the MatchPage component.

  MatchPage maintains state in the form of futureMatchIndex
    -futureMatchIndex represents an index in the array of futureMatches

  MatchPage has three props: currentLogin, futureMatches, likeData.
  -currentLogin is an object that stores the account information for the person who is currently logged in.
  -futureMatches is an array of objects that store the acccount information of the artists that currentLogin could potentially match with
  -likeData is all the likes from the likes table


*/
import React, { Component } from 'react';
import styled from 'styled-components';

import UserDetail from './UserDetail.js';
import Grid from 'react-bootstrap/lib/Grid.js';
import Row from 'react-bootstrap/lib/Row.js';
import Col from 'react-bootstrap/lib/Col.js';
//import Button from 'react-bootstrap/lib/Button.js';

const LoginButton = styled.div`
  background-color: #525252; /* Green */
  border: none;
  color: white;
  padding: 10px 20px 10px 20px;
  cursor: pointer;
  border-radius: 28px;
  margin-right: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 10px;
  &:hover {
   background-color:#FF7700;
 }

`;

const MatchPageWrap = styled.div`
  text-align: center;
  margin-top: 20px;

`;



class MatchPage extends Component{
  constructor(props){
    super(props);

    this.state = {
      futureMatchIndex:0

    };
  }


  handleNext(){
    this.setState({futureMatchIndex: (this.state.futureMatchIndex + 1)});
  }

  handleLike(){
    for (let pair of this.props.likeData){
      // Don't know if this is necessary, but will catch duplicate likes
      if ((pair.user1_id === this.props.currentLogin.id) && (pair.liked_id === this.props.futureMatches[this.state.futureMatchIndex].id)){
        console.log("This user has already been liked, will not record!")
        this.handleNext();
        return;
      }
    }
    this.props.returnLike(this.props.futureMatches[this.state.futureMatchIndex].id);
    this.checkMatch()
    this.handleNext();

  }

  // Helper function, checks to see if the "like" occurs in the reverse direction, meaning we have a match
  checkMatch(){
    for (let pair of this.props.likeData){
      if ((pair.user_id === this.props.futureMatches[this.state.futureMatchIndex].id) && (pair.liked_id === this.props.currentLogin.id)){
        console.log("we foudn a new match!");
        alert("You just matched with " + this.props.futureMatches[this.state.futureMatchIndex].username + "!")
        this.props.returnMatch(this.props.futureMatches[this.state.futureMatchIndex].id)
      }
    }
  }

  render(){
    if(this.props.futureMatches.length > 0){
      return(
        <Grid>
          <Row>
            <MatchPageWrap>
            <Col>
              <LoginButton onClick={()=>this.handleNext()} value="Next">Next</LoginButton>
              <LoginButton onClick={()=>this.handleLike()} value="Like">Like</LoginButton>
            </Col>
            </MatchPageWrap>
          </Row>
          <Row bsClass="topRow">
            <Col><UserDetail currentLogin={this.props.futureMatches[this.state.futureMatchIndex]}/></Col>
          </Row>
        </Grid>


      );

    } else {
      return(
        <div><p>Sorry, there is no one to match with!</p></div>
      )

    }

  }
}



export default MatchPage;
