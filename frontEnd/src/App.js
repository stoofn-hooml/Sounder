/*
  App.js

  App is the top-level component of our application. It is responsible for managing the data collection.

  App maintains state in the form of mode, currentLogin, currentMatch, matches, futureMatches, likes, and matchTimes.
  -mode determines which page is being displayed.
  -currentLogin is an object that stores the account information for the person who is currently logged in.
  -currentMatch is an object that stores the account information of the person that will be dispalyed in MatchDetailPage
  -matches is an array of objects that store the acccount information of the artists that currentLogin has matched with
  -futureMatches is an array of objects that store the acccount information of the artists that currentLogin could potentially match with
  -likes is an array with all the likes in the database
  -matchTimes is an array that stores all the times that currentLogin matched with another user
  */

import React, { Component } from 'react';
import MatchPage from './Components/MatchPage.js';
import HomePage from './Components/HomePage.js';
import MatchingSettingsPage from './Components/MatchingSettingsPage.js';
import MatchDetailPage from './Components/MatchDetailPage.js';
import NavBar from './Components/NavBar.js';



const SERVER = 'http://localhost:4321';
//const SERVER = 'http://basin.cs.middlebury.edu:4321';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      mode: null,
      currentLogin: null,
      futureMatches: [],
      currentMatch: null,
      matches: [],
      likes: null,
      matchTimes: []
    }

      this.updateUsers();
      this.updateLikes();
      this.loadLogin();
}

/*
************************* User Functions ***************************************
*/



loadLogin(){
  console.log("Loading login...")
  fetch(SERVER + '/api/user_data', {credentials: 'include'})
        .then((response)=>{
          if (response.ok){
            return response.json();
          }
        })
        .then((data)=>{
          console.log("User data:");
          console.log(data);
          this.setState({currentLogin: data});


          //this.setState({futureMatches: data});
        }).then((data)=>{
            console.log("loading matches");
            console.log(data);
            this.loadMatches(this.state.currentLogin.id)

          }).then((data)=>{
              console.log("setting state of mode");
              console.log(data);
              this.setState({mode:'home'});

            })



          ;
}










  /* Creates new user to be stored in users table with object created in SignUpPage.js,
     information is passed up to App and sent here in POST request */
  createNewUser(newUserObj){
    let userData = {}
    userData.username = newUserObj.username;
    userData.numFollowers = newUserObj.numFollowers;
    userData.profilepictureURL = newUserObj.profilePictureURL;
    userData.profileURL = newUserObj.profileURL;
    userData.followerRangeMin = newUserObj.followerRangeMin;
    userData.followerRangeMax = newUserObj.followerRangeMax;
    //react-select stores multiselected items as string already, don't need to change to store in database
    userData.genre = newUserObj.genre;
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

      let tempObj = Object.assign({}, newUserObj, {id : response[0]});
      this.setState({currentLogin: tempObj, mode: 'home'});
      this.loadMatches(tempObj.id);
    });
  }

  // retrieves all the data from the users table
  updateUsers(){
    fetch(SERVER + '/sounder/users/')
          .then((response)=>{
            if (response.ok){
              return response.json();
            }
          })
          .then((data)=>{
            this.setState({data: data});
          });
  }

  // callback function in MatchingSettings page, replaces old user object with updated objected with updated settings
  updateSettings(updatedUserObj){
    this.setState({currentLogin:updatedUserObj})
    const userStr = JSON.stringify(updatedUserObj);
    const request = new Request(

    SERVER + "/sounder/users/" + updatedUserObj.id ,
    {
      method:'PUT',
      body: userStr,
      headers: new Headers({'Content-type': 'application/json'})
    });

    fetch(request)
    .then((response)=>{
      if (response.ok){
        this.updateUsers();
        return response.json();
      }
    });
    this.setState({mode: 'home'})
    this.loadMatches(this.state.currentLogin.id); //loads futureMatches based on new settings
  }

/*
************************* Like Functions ***************************************
*/

  // Adds new "like" between two users to likes table
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
      });

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

  // retrieves all the data in the likes table
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

/*
************************* Match Functions ***************************************
*/

  /*given a user id, this function retrieves all the people that that user has matched with
   invokes the getMatches function to do most of the work */
  loadMatches(id){
    fetch(SERVER + '/sounder/matches/' + id)
          .then((response)=>{
            if (response.ok){
              return response.json();
            }
          })
          .then((data)=>{
            this.getMatches(id, data);
          })
  }

  /*getMatches is a helper function for loadMatches
   it sets the state of matches and futureMatches
   -order of matches is based off the time of the match
   -order of future matches is based off the following set of criteria: they have liked you,
   they have genres in common with you, they are in your follower range
  */
  getMatches(id, matchData){
    /*----setting state of matches------*/
    let matchArray = [];
    let objArray = [];
    let futureMatchArray = [];
    let timeOfMatches = {};
    for (let match of matchData) {
      let times = [];
      if(match.matched_id !== id){
        matchArray.push(match.matched_id);
        times.push(match.matchTime);
        times.push(match.matchTimeInt);
        timeOfMatches[match.matched_id] = times;
      } else{
        matchArray.push(match.user_id);
        times.push(match.matchTime);
        times.push(match.matchTimeInt);
        timeOfMatches[match.user_id] = times;
      }

    }
    var sortedMatchIdArray = Object.keys(timeOfMatches).map(function(key) {
        return [key, timeOfMatches[key][1]];
    });

    // Sort the array based on the second element
    sortedMatchIdArray.sort(function(first, second) {
        return second[1] - first[1];
    });
    for (let matchid of sortedMatchIdArray) {
      for (let user of this.state.data){
        if (matchid[0] === String(user.id)) {
          objArray.push(user);
        }
      }
    }

    /*--------setting state of futurematches----------------------*/
    let alreadyLikedYouArray = [] //this handles putting those that have already liked you first
    let arrayWithHeur = {};
    for (let user of this.state.data){ //creates futureMatchArray with users in follower range (matching algorithm)
      if((matchArray.indexOf(user.id) < 0) && (user.id !== id) && (this.state.currentLogin.followerRangeMin <= user.numFollowers) && (user.numFollowers <= this.state.currentLogin.followerRangeMax)){
        //if for not matched, and within followerRange min and max
        let doesNotLikeYou = true;

        for (let pair of this.state.likes){ //finds those that have already liked the user and puts them in alredyLikedArray
          if ((pair.user_id === user.id) && (pair.liked_id === this.state.currentLogin.id)){
            alreadyLikedYouArray.push(user);
            doesNotLikeYou = false;
          }
        }
        if(doesNotLikeYou ){ //orders users who have not liked you based off how many genres you have in common

          let ourGenres = this.state.currentLogin.genre.split(',');
          let theirGenres = user.genre.split(',');
          let heur = 0;
          for (let i of ourGenres) {
            for (let j of theirGenres){
              if(i === j){
                heur +=1;
              }
            }
          }
          arrayWithHeur[user.id] = heur;

        futureMatchArray.push(user);
        }
      }
    }

    var sortedByCommonGenre = Object.keys(arrayWithHeur).map(function(key) {
        return [key, arrayWithHeur[key]];
    });

    //Sort the array based on the second element

    sortedByCommonGenre.sort(function(first, second) {
        return second[1] - first[1];

  });
     let sortedArray = [];
    for (let matchid of sortedByCommonGenre) {
      for (let user of futureMatchArray){
        if (matchid[0] === String(user.id)) {
          sortedArray.push(user);
        }
      }
    }
    futureMatchArray = alreadyLikedYouArray.concat(sortedArray); //merges two arrays with already liked you first
    console.log("here is the order of the people you can view");
    console.log(futureMatchArray);
    this.setState({matchTimes: timeOfMatches});

    this.setState({matches: objArray});
    this.setState({futureMatches: futureMatchArray});
  }


  // adds a match (currentLogin.id & matched_id) to the match table
  addMatch(matched_id){
    let matchData = {}
    matchData.user_id = this.state.currentLogin.id;
    matchData.matched_id = matched_id;
    const now = new Date();
    matchData.matchTime = String(now).slice(4,15);
    matchData.matchTimeInt = now.getTime();
    const matchStr = JSON.stringify(matchData);
    const request = new Request(

      SERVER + "/sounder/matches",
      {
        method: 'POST',
        body: matchStr,
        headers: new Headers({'Content-type': 'application/json'})
      });

    fetch(request)
    .then((response)=>{
      if (response.ok){
        return response.json();
      }
      }).then((data)=>{
      this.loadMatches(this.state.currentLogin.id);
    });
  }

/*
************************* Handle Input Functions *******************************
*/

 //adds a like (currentLogin.id likes liked_id) to the likes table
  handleLike(liked_id){
    this.addLike(this.state.currentLogin.id, liked_id)

  }


// clickMatch is a callback function that is turned on when a match in the matchlog is clicked. It changes the state of currentMatch and the mode.
  clickMatch(match){
    this.setState({currentMatch: match});
    this.getMatch()
  }

/*
************************* Karma Functions *******************************
*/

  // Callback function in UserDetail.js to update karma ratings in database
  updateKarma(updatedUserObj){
    this.setState({currentMatch:updatedUserObj});
    const userStr = JSON.stringify(updatedUserObj);
    const request = new Request(

    SERVER + "/sounder/users/" + updatedUserObj.id ,
    {
      method:'PUT',
      body: userStr,
      headers: new Headers({'Content-type': 'application/json'})
    });

    fetch(request)
    .then((response)=>{
      if (response.ok){
        this.updateUsers();
      }
    });
  }

  /* This is a helper function which passes the match of interest down to MatchDetail and UserDetail to handle
     changes to karma rating for the match */
  getMatch(){
    fetch(SERVER + '/sounder/matches/' + this.state.currentLogin.id)
    .then((response)=>{
      if (response.ok){
        return response.json();
      }
    })
    .then((data)=>{
      for (let match of data) {
        if (match.user_id === this.state.currentLogin.id){
          if (match.matched_id === this.state.currentMatch.id) {
            this.setState({getMatch: match});
          }
        }else{    // This handles the fact that we store matches in two ways in match table
          if (match.user_id === this.state.currentMatch.id){
            this.setState({getMatch: match});
          }
        }
      }
    })
    .then(()=>{
      if(this.state.mode === 'home'){
        this.setState({mode: 'matchdetails'})
      }
    });
  }

  // Handles rating changes, PUT request to update match karma rating info
  updateRating(newMatchObject, ratingToChange){
    let match = {
      matchObject : newMatchObject,
      ratingToChange : ratingToChange
    }
    const matchStr = JSON.stringify(match);
    const request = new Request(

    SERVER + "/sounder/matches/" + this.state.currentLogin.id ,
    {
      method:'PUT',
      body: matchStr,
      headers: new Headers({'Content-type': 'application/json'})
    });

    fetch(request)
    .then((response)=>{
      if (response.ok){
        this.updateUsers();
        this.setState({getMatch : newMatchObject})
      }
    });
  }

/*
******************************** Render ***************************************
*/

//The following determines which page should be rendered based on what the state of mode is.

  render() {
    let loading = (<h2>Loading...</h2>);

    if(this.state.mode ==='home' && this.state.matches && this.state.matchTimes){
      return (
        <div className="App">
        <NavBar updateFutureMatches={()=>this.loadMatches(this.state.currentLogin.id)} setMode={(whichMode)=>this.setState({mode: whichMode})} />
        <HomePage clickMatch={(match)=>this.clickMatch(match)} matchlist={this.state.matches} matchTimes={this.state.matchTimes}  currentLogin={this.state.currentLogin} />
        </div>
      );
    }


    if(this.state.mode === 'matchdetails' && this.state.matchTimes){
      return (
        <div>
        <NavBar updateFutureMatches={()=>this.loadMatches(this.state.currentLogin.id)} setMode={(whichMode)=>this.setState({mode: whichMode})} />
          <MatchDetailPage clickMatch={(match)=>this.clickMatch(match)}
                            matchlist={this.state.matches} currentMatch={this.state.currentMatch}
                            setMode={(article)=>this.setState({mode:'home'})}
                            updateSettings={(obj)=>this.updateKarma(obj)} matchTimes={this.state.matchTimes}
                            getMatch={this.state.getMatch} updateRating={(matchObj, ratingToChange)=>this.updateRating(matchObj,ratingToChange)}
                            currentUser={this.state.currentLogin}/>
        </div>
      );
    };

    if(this.state.mode==='settings'){
      return (
        <div className="App">
        <NavBar updateFutureMatches={()=>this.loadMatches(this.state.currentLogin.id)} setMode={(whichMode)=>this.setState({mode: whichMode})} />
          <MatchingSettingsPage
            currentLogin={this.state.currentLogin}
            updateSettings={(obj)=>this.updateSettings(obj)}
            setMode={(article)=>this.setState({mode:'home'})}
          />
        </div>
      );
    }
    if(this.state.mode==='matching'){
      return (
      <div>
      <NavBar updateFutureMatches={()=>this.loadMatches(this.state.currentLogin.id)} setMode={(whichMode)=>this.setState({mode: whichMode})} />
      <MatchPage returnMatch={(matched_id)=>this.addMatch(matched_id)} likeData={this.state.likes} returnLike={(liked_id)=>this.handleLike(liked_id)} currentLogin={this.state.currentLogin} futureMatches={this.state.futureMatches} goToSettings={(article)=>this.setState({mode:'settings'})} setMode={(article)=>this.setState({mode:'home'})}/>
      </div>
      );
    }


    else {
    return(
      <div>
      {loading}
      </div>
    )
    }
  }
}

export default App;
