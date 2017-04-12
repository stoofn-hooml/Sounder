/*

matches.js
this element displays a list of the users past matches

*/

import React, { Component } from 'react';
import data from "../public/sounderUsers.json";
import styled from 'styled-components';

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


class Matches extends Component {
  constructor() {
    super();

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

  }


  render() {
    if (!this.state.current) {
      const log = (<MakeMatches matchlist={this.state.matches} clickname={(user)=>{this.setState({current: user})}}/>);
      console.log(this.state.matches);
      return (
        <div>
          <CenteredTitle>Matches</CenteredTitle>
          <MatchBox>{log}</MatchBox>
        </div>
      );
    }
    else {
      const viewmatch = this.state.current;
      return (
        <div>
          <CenteredTitle>Matches</CenteredTitle>
          <MatchBox>
            <h3>{viewmatch.username}</h3>
            <h5>Picture: {this.state.profilePicture}</h5>
            <h5>Karma Rating: {viewmatch.karma}</h5>
            <h5>Followers: {viewmatch.followers}</h5>
            <h5>Genre: {viewmatch.genre}</h5>
            <h5>Promoted Tracks: {viewmatch.tracks}</h5>
            <h5>see more: {viewmatch.profileURL}</h5>
          </MatchBox>
        </div>
      )
    }
  };
}

export default Matches;
