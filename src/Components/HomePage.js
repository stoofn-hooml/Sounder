/*
  HomePage.js

  This provides the implementation for the Home Page component.

  HomePage does not maintain its own state.

  HomePage takes in three props: setMode, setLogout, and currentLogin. setMode is a callback that updates the state of mode in App.js.
  setLogout is a function that updates the state of mode and currentLogin in App.js.  currentLogin is an object that stores the account information
  for the person who is currently logged in.

*/


import React, { Component } from 'react';
import styled from 'styled-components';
import data from '../../public/sounderUsers.json';


const MatchList = styled.ul`
  list-style: none;
`;

const MatchNames = styled.li`
  margin: 1.5em 0;
`;

const CenteredTitle=styled.h1`
  text-align: center;
`;

const MatchBox=styled.div`
  border: 3px solid black;
  width: 50%;
  margin: auto;
`

function MakeMatches(props){
  const matchlog = (props.matchlist).map((user)=>{
    let name = user.username;
    return (<MatchNames onClick={()=>{props.clickname(user)}}>{name}</MatchNames>);
  });
  return (<MatchList>{matchlog}</MatchList>);
};


class HomePage extends Component{
  constructor(props){
    super(props);

    this.state = {
      username: 'username1',
      matchid: [2, 13, 15, 20],
      view: "matchlist",
    };

    let tempmatches = [];
    for (let profile of data){
      for (let x of this.state.matchid){
        if (profile.id === x){
          tempmatches.push(profile);
        };
      };
    };
    this.state = {matches: tempmatches};


  };

  changeMatch(){
    this.setState({current: null});
  }
  render() {
    let logOut = (<button onClick={()=>this.props.setLogout()}>Log Out</button>);
    let startMatching = (<button onClick={()=>this.props.setMode('matching')}> Start Matching</button>);
    let matchingSettings = (<button onClick={()=>this.props.setMode('matchingSettings')}> Edit Matching Settings</button>);
    let changeCurrentMatchExplore = (<button onClick={()=>this.changeMatch()}>See other matches</button>);
    if (!this.state.current) {
      const log = (<MakeMatches matchlist={this.state.matches} clickname={(user)=>{this.setState({current: user})}}/>);
      console.log(this.state.matches);
      return (
        <div>
        <CenteredTitle>{this.props.currentLogin['username']}</CenteredTitle>
        <MatchBox>
        <h3>Picture: {this.props.currentLogin['profilePicture']}</h3>
        <h3>Karma Rating: {this.props.currentLogin['karma']}</h3>
        <h3>Followers: {this.props.currentLogin['numFollowers']}</h3>
        <h3>Genre: {this.props.currentLogin['genre']}</h3>
        <h3>Promoted Tracks: {this.props.currentLogin['songs']}</h3>
        <h3>see more:  {this.props.currentLogin['profileURL']}</h3>
        </MatchBox>
        <CenteredTitle>Matches</CenteredTitle>
        <MatchBox>
        <h4> Explore Matches </h4>
        {log}
        </MatchBox>
        <div>
        <CenteredTitle>
            {logOut}
            {startMatching}
            {matchingSettings}
        </CenteredTitle>
        </div>
        </div>
      );
    }
    else {
      const viewmatch = this.state.current;
      return (
        <div>
        <CenteredTitle>{this.props.currentLogin['username']}</CenteredTitle>
        <MatchBox>
        <h3>Picture: {this.props.currentLogin['profilePicture']}</h3>
        <h3>Karma Rating: {this.props.currentLogin['karma']}</h3>
        <h3>Followers: {this.props.currentLogin['numFollowers']}</h3>
        <h3>Genre: {this.props.currentLogin['genre']}</h3>
        <h3>Promoted Tracks: {this.props.currentLogin['songs']}</h3>
        <h3>see more:  {this.props.currentLogin['profileURL']}</h3>
        <CenteredTitle>Matches</CenteredTitle>
        </MatchBox>
          <MatchBox>
            <h3>{viewmatch.username}</h3>
            <h5>Picture: {this.state.profilePicture}</h5>
            <h5>Karma Rating: {viewmatch.karma}</h5>
            <h5>Followers: {viewmatch.followers}</h5>
            <h5>Genre: {viewmatch.genre}</h5>
            <h5>Promoted Tracks: {viewmatch.tracks}</h5>
            <h5>see more: {viewmatch.profileURL}</h5>
            {changeCurrentMatchExplore}
        </MatchBox>
        <div>
        <CenteredTitle>
            {logOut}
            {startMatching}
            {matchingSettings}
        </CenteredTitle>
        </div>
        </div>
      );
    }



  }
}

export default HomePage;
