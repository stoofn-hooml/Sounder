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
    if (this.checkLiked(0)){
        this.state = {
          futureMatchIndex: this.findNext(0)
        }
    }
    else{
    this.state = {
      futureMatchIndex:0
    };
    }
  }

  checkLiked(index){//checks whether the next up user has been liked
      for (let pair of this.props.likeData){
        if ((pair.user_id === this.props.currentLogin.id) && (pair.liked_id === this.props.futureMatches[index].id)){
          return true;
        }
      }
    return false;
  }

  findNext(currentIndex){ //finds the next valid match candidate to be displayed at/after currentIndex
    let i = currentIndex+1 //index of next user
      while (i < this.props.futureMatches.length){
          if(this.checkLiked(i)){ //keeps going through candidates untill we get to one that hasn't been liked
            i+=1;
          }else{
            return i;
          }
      }
      return this.props.futureMatches.length; //return end of array index
  }

  handleNext(){
        this.setState({futureMatchIndex: this.findNext(this.state.futureMatchIndex)});
      }


  handleLike(){
    for (let pair of this.props.likeData){
      //  Catches duplicate likes
      if ((pair.user_id === this.props.currentLogin.id) && (pair.liked_id === this.props.futureMatches[this.state.futureMatchIndex].id)){
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
        alert("You just matched with " + this.props.futureMatches[this.state.futureMatchIndex].username + "!")
        this.props.returnMatch(this.props.futureMatches[this.state.futureMatchIndex].id)
      }
    }
  }

  handleRefresh(){
    this.setState({futureMatchIndex: this.findNext(-1)}); //goes back to start (-1 is because of how findnext works normally)
  }

  render(){
    if(this.props.futureMatches.length > 0 && this.state.futureMatchIndex < this.props.futureMatches.length){
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
        <div><p>Sorry, there is no one to match with! Try widening your search by follower range in Settings.</p>
        <LoginButton onClick={()=>this.props.goToSettings()} value="Settings">Settings</LoginButton>
        <p>Or refresh matches.</p>
        <LoginButton onClick={()=>this.handleRefresh()} value="Refresh">Refresh</LoginButton></div>
      )

    }

  }
}



export default MatchPage;
