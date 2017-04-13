/*
  HomePage.js

  This provides the implementation for the Home Page component.

  HomePage does not maintain its own state.

  HomePage takes in four props: data, setMode, setLogout, and currentLogin. data is our main collection of data has all of our user's account information.
  setMode is a callback that updates the state of mode in App.js. setLogout is a function that updates the state of mode and currentLogin in App.js.  currentLogin is an object that stores the account information
  for the person who is currently logged in.

  HomePage uses three functional components: LoginProfileBox, MatchList, and MatchProfileBox. LoginProfileBox represents the user
  profile of whoever is currently logged in. MatchList represents the list of people you matched with. MatchProfileBox
  represents the profile of one of your matches.

*/


import React, { Component } from 'react';
import styled from 'styled-components';
//import data from '../../public/sounderUsers.json';


const ListOfMatches = styled.ul`
  list-style: none;
`;

const MatchNames = styled.li`
  margin: 1.5em 0;
`;

const CenteredTitle=styled.h1`
  text-align: center;
`;

const BoxArea=styled.div`
  border: 3px solid black;
  width: 50%;
  margin: auto;
`
const Button = styled.button`
  background-color: black; /* Green */
  border: none;
  color: white;
  padding: 15px 24px;
  margin-right: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  &:hover {
    .button {
      display: none;
    }
`
function LoginProfileBox(props){
  return (
  <div>
  <CenteredTitle>{props.currentLogin['username']}</CenteredTitle>
  <BoxArea>
  <h3>Picture: {props.currentLogin['profilePicture']}</h3>
  <h3>Karma Rating: {props.currentLogin['karma']}</h3>
  <h3>Followers: {props.currentLogin['numFollowers']}</h3>
  <h3>Genre: {props.currentLogin['genre']}</h3>
  <h3>Promoted Tracks: {props.currentLogin['songs']}</h3>
  <h3>see more:  {props.currentLogin['profileURL']}</h3>
  </BoxArea>
  </div>);
};


function MatchList(props){
  const matchlog = (props.matchlist).map((user)=>{
    let name = user.username;
    return (<MatchNames key={name} onClick={()=>{props.clickname(user)}}>{name}</MatchNames>);
  });
  return (<ListOfMatches>{matchlog}</ListOfMatches>);
};


function MatchProfileBox(props){
  let viewmatch = props.currentMatchProfile;
  let exploreMatchesButton = (<Button onClick={()=>props.changeMatch()}>See other matches</Button>);
  return(
    <BoxArea>
      <h3>{viewmatch.username}</h3>
      <h5>Picture: {viewmatch.profilePicture}</h5>
      <h5>Karma Rating: {viewmatch.karma}</h5>
      <h5>Followers: {viewmatch.followers}</h5>
      <h5>Genre: {viewmatch.genre}</h5>
      <h5>Promoted Tracks: {viewmatch.tracks}</h5>
      <h5>see more: {viewmatch.profileURL}</h5>
      {exploreMatchesButton}
  </BoxArea>

  )
};


class HomePage extends Component{
  constructor(props){
    super(props);

    this.state = {
      username: 'username1',
      matchid: [2, 13, 15, 20],
    };

    let tempmatches = [];
    let data = props.data;
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
    this.setState({currentMatchProfile: null});
  }
  render() {
    let logOut = (<Button onClick={()=>this.props.setLogout()}>Log Out</Button>);
    let startMatching = (<Button onClick={()=>this.props.setMode('matching')}> Start Matching</Button>);
    let matchingSettings = (<Button onClick={()=>this.props.setMode('matchingSettings')}> Edit Matching Settings</Button>);

    let loginProfileBox = (<LoginProfileBox currentLogin={this.props.currentLogin}/>);

    if (!this.state.currentMatchProfile) {
      const log = (<MatchList matchlist={this.state.matches} clickname={(user)=>{this.setState({currentMatchProfile: user})}}/>);
      return (
        <div>
        {loginProfileBox}
        <CenteredTitle>Matches</CenteredTitle>
        <BoxArea>
        <h4> Explore Matches </h4>
        {log}
        </BoxArea>
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
      let matchProfileBox = (<MatchProfileBox currentMatchProfile={this.state.currentMatchProfile} changeMatch={()=>{this.changeMatch()}}/>);
      return (
        <div>
        {loginProfileBox}
        {matchProfileBox}
        <CenteredTitle>
            {logOut}
            {startMatching}
            {matchingSettings}
        </CenteredTitle>
        </div>
      );
    }
  }
}

export default HomePage;
