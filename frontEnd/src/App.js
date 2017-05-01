/*
  App.js

  App is the top-level component of our application. It is responsible for managing the data collection.

  App maintains state in the form of currentLogin, mode, currentMatchIds, futureMatchesIds, currentMatch, matches, and futureMatches.
  -currentLogin is an object that stores the account information for the person who is currently logged in.
  -mode determines which page is being displayed.
  -currentMatchIds is an array of ids that represent all the artists that currentLogin has matched with
  -futureMatchesIds is an array of ids that represent all the artists that currentLogin could potentially match with
  -currentMatch is an object that stores the account information of the person that currentLogin has matched with and the user of the profile
  that currentLogin is looking at in MatchDetailPage
  -matches is an array of objects that store the acccount information of the artists that currentLogin has matched with
  -futureMatches is an array of objects that store the acccount information of the artists that currentLogin could potentially match with
  */

import React, { Component } from 'react';
import styled from 'styled-components';

import MatchPage from './Components/MatchPage.js';
import HomePage from './Components/HomePage.js';
import data from '../public/sounderUsers.json';
import LoginPage from './Components/LoginPage.js';
import SignUpPage from './Components/SignUpPage.js';
import MatchingSettingsPage from './Components/MatchingSettingsPage.js';
import MatchDetailPage from './Components/MatchDetailPage.js';
import NavBar from './Components/NavBar.js';


const SERVER = 'http://localhost:4321';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      mode: 'login',
      currentLogin: null,
      currentMatchIds: [2, 13, 15, 20, 17, 18, 19, 25, 27, 29, 30, 31, 32, 33, 34, 35, 37, 38, 40, 42,43],
      futureMatches: [],
      currentMatch: null,
    }

      this.updateUsers();
      this.updateLikes();

}


/*next on list of things to do, is manual enter stuff, so that ther is no IDt*/
createNewUser(newUserObj){
  let userData = {}
  userData.username = newUserObj.username;
  userData.numFollowers = newUserObj.numFollowers;
  userData.profilepictureURL = newUserObj.photoURL;
  userData.karma = newUserObj.karma;
  userData.profileURL = newUserObj.profileURL;
  userData.genre = newUserObj.genre[0];
  userData.followerRangeMin = 0;
  userData.followerRangeMax = 100000000;
  userData.online = 0;
  userData.song1 = newUserObj.song1;
  userData.song2 = newUserObj.song2;
  userData.song3 = newUserObj.song3;
  const userStr = JSON.stringify(userData);
  const request = new Request(
  SERVER + "/sounder/users/" ,
  {
    method:'POST',
    body: userStr,
    headers: new Headers({'Content-type': 'application/json'})
  }
  );

  fetch(request)
  .then((response)=>{
    if (response.ok){
      this.updateUsers();
      return response.json();
    }
  })
  .then((response)=>{
    // ************************************************
    // This needs to be fixed !!!!!!
    // ************************************************
    let tempObj = Object.assign({}, newUserObj, {id : response[0]});
    this.setState({currentLogin: tempObj, mode: 'home'});
    console.log("new User created " + newUserObj + " with username " + newUserObj.username + " and password " + newUserObj.password);
  });
}

addLike(user_id, liked_id){
  let likeData = {}
  likeData.user_id = user_id;
  likeData.liked_id = liked_id;
  const likeStr = JSON.stringify(likeData);
  const request = new Request(
    SERVER + "/sounder/likes",
    {
      method: 'POST',
      body: likeStr,
      headers: new Headers({'Content-type': 'application/json'})
    }
  );

  fetch(request)
  .then((response)=>{
    if (response.ok){
      return response.json();
    }
  })
  .then(()=>{
    this.updateLikes();
  })
}

// THIS IS IMPORTANT: We need to "refetch" our data as it's being updated on
// the backend if we want frontend to reflect these changes in real-time
updateLikes(){
  fetch(SERVER + '/sounder/likes/')
        .then((response)=>{
          if (response.ok){
            return response.json();
          }
        })
        .then((data)=>{
          this.setState({likes: data});
        });
}

updateUsers(){
  fetch(SERVER + '/sounder/users/')
        .then((response)=>{
          if (response.ok){
            return response.json();
          }
        })
        .then((data)=>{
          this.setState({data: data});
          //this.setState({futureMatches: data});
        });
}




loadMatches(id){
  fetch(SERVER + '/sounder/matches/' + id)
        .then((response)=>{
          if (response.ok){
            return response.json();
          }
        })
        .then((data)=>{
          this.getMatches(id, data);
          // let matchData = this.getMatches(id, data);
          // this.setState({matches:matchData});
        })
}

getMatches(id, matchData){
  let matchArray = [];
  let objArray = [];
  let futureMatchArray = [];
  for (let match of matchData) {
    if(match.matched_id !== id){
      matchArray.push(match.matched_id);
    } else{
      matchArray.push(match.user_id);
    }

  }
  for (let matchid of matchArray) {
    for (let user of this.state.data){
      if (matchid === user.id) {
        objArray.push(user);
      }
    }
  }
  for (let user of this.state.data){
    if((matchArray.indexOf(user.id) < 0) &&(user.id !== id)){
      futureMatchArray.push(user);
    }
  }
  this.setState({matches: objArray});
  this.setState({futureMatches: futureMatchArray});
}



addMatch(matched_id){
  let matchData = {}
  matchData.user_id = this.state.currentLogin.id;
  matchData.matched_id = matched_id;
  const matchStr = JSON.stringify(matchData);
  const request = new Request(
    SERVER + "/sounder/matches",
    {
      method: 'POST',
      body: matchStr,
      headers: new Headers({'Content-type': 'application/json'})
    }
  );

  fetch(request)
  .then((response)=>{
    if (response.ok){
      return response.json();
    }
    }).then((data)=>{
    this.loadMatches(this.state.currentLogin.id);
  });
}

  handleLike(liked_id){
    this.addLike(this.state.currentLogin.id, liked_id)

  }


  /*handleSignIn is a function that is turned on when someone tries to sign in. If the username is in the database, it changes the state of currentLogin to
  match this username. It also will update the state to be the home page. */
  handleSignIn(username){
    for (let profile of this.state.data){
      if (profile.username === username){ //we also need to now check password here
        this.setState({currentLogin: profile});
        this.loadMatches(profile.id);
        this.setState({mode: 'home'});
        return;
      }
    }
    alert("This is not a valid user! Please try again.");
  }

/* handle signUp will be called when a new user tries to sign up, if the username is in data, it will
   return nothing and LoginPage will throw an error to the user, if the username is not in data, it will
   create a new user with username and password*/
  handleSignUp(newUserObj){
      let alreadyThere = false
      for (let profile of this.state.data){
          if (profile.username === newUserObj.username){
              alert("This username is already taken! Please enter a different one.");
              console.log("this user already exists")
              alreadyThere = true
              return;
          }
      }
      if (alreadyThere === false){

        this.createNewUser(newUserObj);
        //this.setState({currentLogin: newUserObj, mode: 'home'});
        //console.log("new User created " + newUserObj + " with username " + newUserObj.username + " and password " + newUserObj.password);
      }
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

  /*callback function in MatchingSettings page, replaces old user object with updated objected with updated settings*/
  updateSettings(updatedUserObj){
    console.log(updatedUserObj);
    this.setState({currentLogin:updatedUserObj})


    const userStr = JSON.stringify(updatedUserObj);
    const request = new Request(
    SERVER + "/sounder/users/" + updatedUserObj.id ,
    {
      method:'PUT',
      body: userStr,
      headers: new Headers({'Content-type': 'application/json'})
    }
    );

    fetch(request)
    .then((response)=>{
      if (response.ok){
        this.updateUsers();
        return response.json();
      }
    });
  }
  /*The following determines which page should be displayed based on what the state of mode is. */

  render() {
    if(this.state.mode ==='home' && this.state.matches){
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

          <LoginPage setProfile={(username)=>this.handleSignIn(username)} newUser={(username,password)=>this.handleSignUp(username,password)} switchToSignUp={()=>this.setState({mode: 'signUp'})}/>
        </div>
      );
    };

    if(this.state.mode ==='signUp'){
      return (
        <div className="App">

          <SignUpPage newUser={(obj)=>this.handleSignUp(obj)} switchToLogin={()=>this.setState({mode: 'login'})}/>
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
      console.log(this.state.currentLogin);
      return (
        <div className="App">
        <NavBar setMode={(whichMode)=>this.setState({mode: whichMode})}/>

          <MatchingSettingsPage
            currentLogin={this.state.currentLogin}
            updateSettings={(obj)=>this.updateSettings(obj)}
            setMode={(article)=>this.setState({mode:'home'})}
          />
        </div>
      );
    }
    else {
      return (
      <div>
      <NavBar setMode={(whichMode)=>this.setState({mode: whichMode})}/>

      <MatchPage returnMatch={(matched_id)=>this.addMatch(matched_id)} likeData={this.state.likes} returnLike={(liked_id)=>this.handleLike(liked_id)} currentLogin={this.state.currentLogin} futureMatches={this.state.futureMatches} setMode={(article)=>this.setState({mode:'home'})}/>
      </div>
      );
    }
  }
}

export default App;
