/*
  HomePage.js

  This provides the implementation for the Home Page component.

  HomePage does not maintain its own state.

  HomePage takes in three props: setMode, setLogout, and currentLogin. setMode is a callback that updates the state of mode in App.js.
  setLogout is a function that updates the state of mode and currentLogin in App.js.  currentLogin is an object that stores the account information
  for the person who is currently logged in.

*/


import React, { Component } from 'react';


class HomePage extends Component{
  constructor(props){
    super(props);


  };




  render() {
    let logOut = (<button onClick={()=>this.props.setLogout()}>Log Out</button>);
    let startMatching = (<button onClick={()=>this.props.setMode('matching')}> Start Matching</button>);
    let matchingSettings = (<button onClick={()=>this.props.setMode('matchingSettings')}> Edit Matching Settings</button>);
      return(
        <div>
          <h1>
          Sounder
          </h1>

          <h2>{this.props.currentLogin['username']}</h2>
          <h3>Picture: {this.props.currentLogin['profilePicture']}</h3>
          <h3>Karma Rating: {this.props.currentLogin['karma']}</h3>
          <h3>Followers: {this.props.currentLogin['numFollowers']}</h3>
          <h3>Genre: {this.props.currentLogin['genre']}</h3>
          <h3>Promoted Tracks: {this.props.currentLogin['songs']}</h3>
          <h3>see more:  {this.props.currentLogin['profileURL']}</h3>

          <div>
          {logOut}
          {startMatching}
          {matchingSettings}
          </div>

        </div>
      );

  }
}

export default HomePage;
