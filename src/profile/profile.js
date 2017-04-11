/*
  profile.js

  This provides the implementation for the profile component.

*/


import React, { Component } from 'react';
import data from "../../public/sounderUsers.json";

class Profile extends Component{
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
      return(
        <div>
          <h1>
          Sounder
          </h1>
          <h2>{this.props.user}</h2>
          <h3>Picture: {this.state.profilePicture}</h3>
          <h3>Karma Rating: {this.state.karma}</h3>
          <h3>Followers: {this.state.followers}</h3>
          <h3>Genre: {this.state.genre}</h3>
          <h3>Promoted Tracks: {this.state.tracks}</h3>
          <h3>see more: {this.state.profileURL}</h3>
          <div>
          {logOut}
          </div>
          <input type="button" value="Start Matching" onClick={()=>this.props.setMode()}/>
        </div>
      );

  }
}

export default Profile;
