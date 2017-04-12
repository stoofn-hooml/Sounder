/*
  App.js

  App is the top-level component of our application. It is responsible for managing the data collection.

  App maintains state in the form of currentLogin and and mode. currentLogin is an oject that stores the account information for the person who is currently logged in.
  Mode determines which page is being displayed.
  */

import React, { Component } from 'react';
import styled from 'styled-components';

import MatchPage from './Components/MatchPage.js';
import HomePage from './Components/HomePage.js';
import data from '../public/sounderUsers.json';
import Login from './Components/Login.js';
import MatchingSettings from './Components/MatchingSettings.js';



class App extends Component {
  constructor(props){
    super(props);
    this.state={
      mode: 'login',
      currentLogin: null

    }
  }

  /*handleSignIn is a function that is turned on when someone tries to sign in. If the username is in the database, it changes the state of currentLogin to
  match this username. It also will update the state to be the home page. */
  handleSignIn(username){
    for (let profile of data){
      if (profile.username === username){
        this.setState({currentLogin: profile, mode: 'home'});
        return;
      }
    }
    alert("This is not a valid user! Please try again.");
  }

  /*handleLogOut is a function that is tutned on when someone tries to log out. It updates the state of currentLogin to be null.
  It updates the mode to be the login page. */
  handleLogOut(){
      this.setState({currentLogin:null, mode:'login'});
    }

    /*The following determines which page should be displayed based on what the state of mode is. */
  render() {
    if(this.state.mode ==='home'){
      return (
        <div className="App">
          <HomePage setLogout={()=>this.handleLogOut()} currentLogin={this.state.currentLogin} setMode={(whichMode)=>this.setState({mode: whichMode})}/>
        </div>
      );
    }
    if(this.state.mode ==='login'){
      return (
        <div className="App">
          <Login setProfile={(username)=>this.handleSignIn(username)}/>
        </div>
      );
    }
    if(this.state.mode==='matchingSettings'){
      return (
        <div className="App">
          <MatchingSettings setProfile={(username)=>this.handleSignIn(username)} setMode={(article)=>this.setState({mode:'home'})}/>
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <MatchPage setMode={()=>this.setState({mode:'home'})}  userObject={this.state.currentLogin}/>
        </div>
      );
    }
  }
}

export default App;
