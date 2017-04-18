/*
  App.js

  App is the top-level component of our application. It is responsible for managing the data collection.

  App maintains state in the form of currentLogin, mode, currentMatchIds, futureMatchesIds, currentMatch, matches, and futurematches.
  -currentLogin is an object that stores the account information for the person who is currently logged in.
  -mode determines which page is being displayed.
  -currentMatchIds is an array of ids that represent all the artists that currentLogin has matched with
  -futureMatchesIds is an array of ids that represent all the artists that currentLogin could potentially match with
  -currentMatch is an object that stores the account information of the person that currentLogin has matched with and the user of the profile
  that currentLogin is looking at in MatchDetailPage
  -matches is an array of objects that store the acccount information of the artists that currentLogin has matched with
  -futurematches is an array of objects that store the acccount information of the artists that currentLogin could potentially match with
  */

import React, { Component } from 'react';
import styled from 'styled-components';

import MatchPage from './Components/MatchPage.js';
import HomePage from './Components/HomePage.js';
import data from '../public/sounderUsers.json';
import LoginPage from './Components/LoginPage.js';
import MatchingSettingsPage from './Components/MatchingSettingsPage.js';
import MatchDetailPage from './Components/MatchDetailPage.js';
import NavBar from './Components/NavBar.js';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      mode: 'login',
      currentLogin: null,
      currentMatchIds: [2, 13, 15, 20, 17, 18, 19, 25, 27, 29, 30, 31, 32, 33, 34, 35, 37, 38, 40, 42,43],
      futureMatchesIds: [3, 5, 6, 7,8 ,9 ,10 ,11],
      currentMatch: null

    }


    /*here we set the state of matches and futurematches by iterating through currentMatchIds and futureMatchesIds respectively*/
    let tempmatches = [];
    let futurematches = [];
    for (let profile of data){
      console.log(profile.id);
      for (let x of this.state.currentMatchIds){
        if (profile.id === x){
          tempmatches.push(profile);

        };
      };
      for (let x of this.state.futureMatchesIds){
        if (profile.id === x){
          futurematches.push(profile);

        };
      };
    };
    this.state.matches = tempmatches;
    this.state.futurematches = futurematches;




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

  /*handleLogOut is a function that is turned on when someone tries to log out. It updates the state of currentLogin to be null.
  It updates the mode to be the login page. */
  handleLogOut(){
      this.setState({currentLogin:null, mode:'login'});
    }

/*clickMatch is a callback function that is turned on when a match in the matchlog is clicked. It changes the state of currentMatch and the mode. */
  clickMatch(match){
    if(this.state.mode === 'home'){
      this.setState({mode: 'matchdetails'})
    }
    this.setState({currentMatch: match});
  }

  /*The following determines which page should be displayed based on what the state of mode is. */

  render() {
    if(this.state.mode ==='home'){
      return (
        <div className="App">
        <NavBar setMode={(whichMode)=>this.setState({mode: whichMode})}/>
        <HomePage clickMatch={(match)=>this.clickMatch(match)} matchlist={this.state.matches}  setLogout={()=>this.handleLogOut()} currentLogin={this.state.currentLogin} setMode={(whichMode)=>this.setState({mode: whichMode})}/>
        </div>
      );
    }
    if(this.state.mode ==='login'){
      return (
        <div className="App">

          <LoginPage setProfile={(username)=>this.handleSignIn(username)}/>
        </div>
      );
    };

    if(this.state.mode === 'matchdetails'){
      return (
        <div>
        <NavBar setMode={(whichMode)=>this.setState({mode: whichMode})}/>

          <MatchDetailPage clickMatch={(match)=>this.clickMatch(match)} matchlist={this.state.matches} currentMatch={this.state.currentMatch} setMode={(article)=>this.setState({mode:'home'})} />
        </div>
      );
    };

    if(this.state.mode==='settings'){
      return (
        <div className="App">
        <NavBar setMode={(whichMode)=>this.setState({mode: whichMode})}/>

          <MatchingSettingsPage setProfile={(username)=>this.handleSignIn(username)} setMode={(article)=>this.setState({mode:'home'})}/>
        </div>
      );
    }
    else {
      return (
      <div>
      <NavBar setMode={(whichMode)=>this.setState({mode: whichMode})}/>

      <MatchPage currentLogin={this.state.currentLogin} futureMatches = {this.state.futurematches} setMode={(article)=>this.setState({mode:'home'})}/>
      </div>
      );
    }
  }
}

export default App;
