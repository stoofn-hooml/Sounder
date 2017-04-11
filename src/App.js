/*
  App.js

  App is the top-level component of our application. It is responsible for managing the data collection.

  It displays the title of the application. All of the real work is handled by the ContentArea component.
  */

import React, { Component } from 'react';
import styled from 'styled-components';

import MatchPage from './MatchingPage/MatchPage.js';
import Profile from './profile/HomePage.js';
import data from '../public/sounderUsers.json';
import Login from './Components/Login.js';

const CenteredTitle=styled.h1`
  text-align: center;
`;


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      mode: 'login',



    }
  }

  handleSignIn(username){
    for (let profile of data){
      if (profile.username === username){
        this.setState({userObject: profile, mode: 'home'});
        return;
      }
    }
    alert("This is not a valid user! Please try again.");
  }


  handleLogOut(){
      this.setState({user: null, username: '',mode:'login'});
    }


  render() {
    if(this.state.mode =='home'){
      return (
        <div className="App">
          <Profile setLogout={()=>this.handleLogOut()} userObject= {this.state.userObject} setMode={()=>this.setState({mode:'matching'})}/>
        </div>
      );
    }
    if(this.state.mode =='login'){
      return (
        <div className="App">
          <Login setProfile={(username)=>this.handleSignIn(username)} setMode={(article)=>this.setState({mode:'home'})}/>
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <MatchPage setMode={()=>this.setState({mode:'home'})}  userObject={this.state.userObject}/>
        </div>
      );
    }
  }
}

export default App;
