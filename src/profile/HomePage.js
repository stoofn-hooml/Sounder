/*
  profile.js

  This provides the implementation for the profile component.

*/


import React, { Component } from 'react';
import data from "../../public/sounderUsers.json";

class HomePage extends Component{
  constructor(){
    super();

// Mock sign-in mechanism so we can "choose" which user to show
    this.state = {
      username: '',
      user: null
    }
  };


  handleLogOut(){
    this.setState({user: null, username: ''});
  }

  render() {
    let logOut = (<button onClick={()=>this.props.setLogout()}>Log Out</button>);
    let startMatching = (<button onClick={()=>this.props.setMode()}> Start Matching</button>);
      return(
        <div>
          <h1>
          Sounder
          </h1>

          <h2>{this.props.userObject['username']}</h2>
          <h3>Picture: {this.props.userObject['profilePicture']}</h3>
          <h3>Karma Rating: {this.props.userObject['karma']}</h3>
          <h3>Followers: {this.props.userObject['numFollowers']}</h3>
          <h3>Genre: {this.props.userObject['genre']}</h3>
          <h3>Promoted Tracks: {this.props.userObject['songs']}</h3>
          <h3>see more:  {this.props.userObject['profileURL']}</h3>

          <div>
          {logOut}
          {startMatching}
          </div>

        </div>
      );

  }
}

export default HomePage;
