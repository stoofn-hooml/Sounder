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
        this.setState({profilePicture: profile.profilePicture});
        this.setState({karma: profile.karma});
        this.setState({tracks: profile.songs});
        this.setState({followers: profile.followers.length});
        this.setState({genre: profile.genre });
        this.setState({profileURL: profile.profileURL});
        return;
      }
    }
    alert("This is not a valid user! Please try again.");
  }

  handleLogOut(){
    this.setState({user: null, username: ''});
  }

  render() {
    let usernameInput = (<input type="text" value={this.state.username} onChange={(event)=>{this.handleUsername(event)}}/>);
    let signIn = (<button onClick={()=>this.handleSignIn(this.state.username)}>Sign In</button>);
    let logOut = (<button onClick={()=>this.handleLogOut()}>Log Out</button>);

    if (this.state.user){
      return(
        <div>
          <h1>
          Sounder
          </h1>
          <h2>{this.state.user}</h2>
          <h3>Picture: {this.state.profilePicture}</h3>
          <h3>Karma Rating: {this.state.karma}</h3>
          <h3>Followers: {this.state.followers}</h3>
          <h3>Genre: {this.state.genre}</h3>
          <h3>Promoted Tracks: {this.state.tracks}</h3>
          <h3>see more: {this.state.profileURL}</h3>
          <div>
          {logOut}
          </div>
        </div>
      );
    }

    return(
      <div>
        <h1>
        Sounder
        </h1>
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