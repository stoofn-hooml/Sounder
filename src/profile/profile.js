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

  handleUsername(inputEvent){
    this.setState({username: inputEvent.target.value});
  }

  handleSignIn(username){
    for (let profile of data){
      if (profile.username === username){
        this.setState({user: username});
        this.setState({tracks: profile.songs});
        this.setState({followers: profile.followers.length});
        this.setState({genre: profile.genre });
        return;
      }
    }
    alert("This is not a valid user! Please try again.");
  }

  render() {
    let usernameInput = (<input type="text" value={this.state.username} onChange={(event)=>{this.handleUsername(event)}}/>);
    let signIn = (<button onClick={()=>this.handleSignIn(this.state.username)}>Sign In</button>);

    if (this.state.user){
      return(
        <div>
          <div>
          {usernameInput}
          </div>
          <div>
        {signIn}
          </div>
          <h1>{this.state.user}</h1>
          <h2>Followers: {this.state.followers}</h2>
          <h2>Genre: {this.state.genre}</h2>
          <h2>Promoted Tracks: {this.state.tracks}</h2>

        </div>
      );
    }

    return(
      <div>
        <div>
        {usernameInput}
        </div>
        <div>
      {signIn}
        </div>
      </div>
    );
  }
}

export default Profile;
