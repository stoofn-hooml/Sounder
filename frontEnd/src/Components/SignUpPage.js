/*
  SignUpPage.js

  This provides the implementation for the signUp page.

  TO DO:
  !! Figure out how to integrate Soundcloud API
  Password Confirmation (Have user input password twice), currently password2 does nothing.
  Clean up alerts.
    Make it so all errors are shown on a single alert.
    Or show icons that change dynamically on the side instead
*/

import React, { Component } from 'react';
import styled from 'styled-components';
import DropdownButton from 'react-bootstrap/lib/DropdownButton.js';
import MenuItem from 'react-bootstrap/lib/MenuItem.js';
import MultiGenreSelect from './MultiGenreSelect.js'


//import Col from 'react-bootstrap/lib/Col.js';

const LoginPage = styled.div`
  text-align: center;
  margin-top: 100px;
  height: 50%;
`;

const UsernameInput = styled.div`
  background-color: #FF7700; /* orange  */
  position: relative;
  padding: 10px;
  font-size: 16px;
  height:50;
  width: 300px;
  display: inline-block;
`;



const LoginButton = styled.div`
  background-color: #525252; /* Green */
  border: none;
  color: white;
  padding: 10px 20px 10px 20px;
  cursor: pointer;
  border-radius: 28px;
  margin-right: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 10px;
  &:hover {
   background-color:#FF7700;
 }

`;

const SounderHeader = styled.div`
  font-size: 3.0em;
  font-weight: bold;
  font-variant: small-caps;
  color:#525252;
`;

const Input = styled.input`
  width:200px;
  height:25px;

`;

class SignUp extends Component{
  constructor(){
    super();
    this.state = {
      id: '',
      username: '',
      password: '',
      password2: '',
      song1: '',
      song2: '',
      song3: '',
      profileURL: '',
      genres: '', //make this an array later
      numFollowers: '',
      profilePictureURL: '',
      email: ''

    }
  };

handleSelectChange (value) {
  console.log('You\'ve selected:', value);
  this.setState({ value });
  console.log(this.state.value);
}

handleUsername(inputEvent){
  this.setState({username: inputEvent.target.value});
}

handlePassword(inputEvent){
  this.setState({password: inputEvent.target.value});
}

handlePassword2(inputEvent){
  this.setState({password2: inputEvent.target.value});
//  if(this.state.password2 != this.state.password){
//    alert("Test");
//  }
}

handleSong1(inputEvent){
  this.setState({song1: inputEvent.target.value});
}

handleSong2(inputEvent){
  this.setState({song2: inputEvent.target.value});
}

handleSong3(inputEvent){
  this.setState({song3: inputEvent.target.value});
}

handleProfileURL(inputEvent){
  this.setState({profileURL: inputEvent.target.value});
}

handleNumFollowers(inputEvent){
  this.setState({numFollowers: inputEvent.target.value});
}

handleGenres(inputEvent){ //make this an array handler later
  this.setState({genres: inputEvent.target.value});
}

handlePhotoURL(inputEvent){
  this.setState({profilePictureURL: inputEvent.target.value});

}

handleEmail(inputEvent){
  this.setState({email: inputEvent.target.value});
}




/*
 ********************************************************************
 User Object Creation: put all standardized property conventions here
 ********************************************************************
*/

createUser(){ //creates the actual user object
  let newUserObj = {
  username: this.state.username,
  password: this.state.password,
  song1: this.state.song1,
  song2: this.state.song2,
  song3: this.state.song3,
  profileURL: this.state.profileURL,
  genre: [this.state.genres], //make this an array later
  numFollowers: this.state.numFollowers,
  profilePictureURL: this.state.profilePictureURL,
  email: this.state.email,
  karma: 0

  /* How to handle these? */

  //id:
  //followers:
  //id;
  //followers: //who follows the user
  //following: //who the user follows
  //followerRange:
  //peopleYouLike:
  //peopleWhoLikedYou:
  //currentMatches:
  //pastMatches:
  //online:
  }

  if (checkValid() === true){
    this.props.newUser(newUserObj);
  }

  //CheckValid looks all the sign-up parameters to see if they are valid. Returns true if valid.
  function checkValid(){
    let complete = false; //Initialize as false just in case some checks fail.

    Object.keys(newUserObj).map(function(key){ //checks that all fields complete
      if (newUserObj[key] === ""){ //If anything is empty then alert the user
        alert("please fill out the " + key + " section");
        return complete;
      }
    })

    if (newUserObj.song1.search("w.soundcloud.com/player/") === -1 ||
      newUserObj.song1.search("tracks") === -1){ //Checks if the song is a valid code and not a playlist
        alert("Please insert a valid embed code for song 1!");
    }
    if (newUserObj.song2.search("w.soundcloud.com/player/") === -1 ||
      newUserObj.song2.search("tracks") === -1){ //Checks if the song is a valid code and not a playlist
        alert("Please insert a valid embed code for song 2!");
    }
    if (newUserObj.song3.search("w.soundcloud.com/player/") === -1 ||
      newUserObj.song3.search("tracks") === -1){ //Checks if the song is a valid code and not a playlist
        alert("Please insert a valid embed code for song 3!");
    }
    if (newUserObj.profilePictureURL.search(".jpg") === -1 && newUserObj.profilePictureURL.search(".png") === -1){ //Image URL should end in .jpg or .png
        alert("Please enter a .jpg or .png file for profile picture!");
    }
    if(newUserObj.password !== newUserObj.password2) { //checks that password/confirm password match
      alert("Passwords do not match, please confirm password")
    }
    else {
      complete = true;
    }
    return complete;
  }

}

render() {
  let usernameInput = (<Input  placeholder="Username" type="text" value={this.state.username} onChange={(event)=>{this.handleUsername(event)}}/>);
  let passwordInput = (<Input  placeholder="Password" type="password" value={this.state.password} onChange={(event)=>{this.handlePassword(event)}}/>);
  let password2Input = (<Input  placeholder="Please confirm password" type="password" value={this.state.password2} onChange={(event)=>{this.handlePassword2(event)}}/>);
  let song1Input = (<Input  placeholder="Song 1 URL" type="text" value={this.state.song1} onChange={(event)=>{this.handleSong1(event)}}/>);
  let song2Input = (<Input  placeholder="Song 2 URL" type="text" value={this.state.song2} onChange={(event)=>{this.handleSong2(event)}}/>);
  let song3Input = (<Input  placeholder="Song 3 URL" type="text" value={this.state.song3} onChange={(event)=>{this.handleSong3(event)}}/>);
  let profileURLInput = (<Input  placeholder="Soundcloud Profile URL" type="text" value={this.state.profileURL} onChange={(event)=>{this.handleProfileURL(event)}}/>);
  let numFollowersInput = (<Input  placeholder="# of SC Followers" type="text" value={this.state.numFollowers} onChange={(event)=>{this.handleNumFollowers(event)}}/>);
  let genre = (<MultiGenreSelect handleSelectChange={(value)=>this.handleSelectChange(value)} value={this.state.value}/>)
  let photoURLInput = (<Input  placeholder="Photo URL" type="text" value={this.state.profilePictureURL} onChange={(event)=>{this.handlePhotoURL(event)}}/>);
  let emailInput = (<Input  placeholder="Email" type="text" value={this.state.email} onChange={(event)=>{this.handleEmail(event)}}/>);

  // let genreOps = ["Alternative Rock", "Ambient", "Classical", "Country", "Dance & EDM", "Dancehall", "Deep House",
  // "Disco", "Drum & Bass", "Dubstep", "Electronic", "Folk & Singer-Songwriter", "Hip-Hop & Rap", "House", "Indie", "Jazz & Blues", "Latin",
  // "Metal", "Piano", "Pop", "R&B & Soul", "Reggae", "Reggaeton", "Rock", "Soundtrack", "Techno", "Trance", "Trap", "Triphop", "World"]
  // let counter = 0;
  // const genrelist = (genreOps).map((genrei)=>{ //creates a genrelist that is displayed in the "Genre" dropdown
  //   counter += 1;
  //   return (<MenuItem eventKey={counter} onClick={()=>{console.log(genrei)}}> {genrei} </MenuItem>);});
  //
  // let genre = (<DropdownButton title='Genres' id='genre-dropdown' onChange={(event)=>{this.handleGenres(event)}}>
  //           {genrelist}
  //           </DropdownButton>)

  let signUp = (<LoginButton onClick={()=>this.createUser()}>Sign Up</LoginButton>);
  let cancel = (<LoginButton onClick={()=>this.props.switchToLogin()} >Cancel</LoginButton>);


    return(
      <LoginPage>
        <SounderHeader>
        Sounder
        </SounderHeader>
        <UsernameInput>
          {usernameInput}
        </UsernameInput>

        <div>
          <UsernameInput>
            {passwordInput}
            {password2Input}
          </UsernameInput>
        </div>

        <div>
          <UsernameInput>
            {song1Input}
            {song2Input}
            {song3Input}
          </UsernameInput>
        </div>

        <div>
          <UsernameInput>
            {profileURLInput}
          </UsernameInput>
        </div>

        <div>
          <UsernameInput>
            {numFollowersInput}
          </UsernameInput>
        </div>

        <div>
          <UsernameInput>
            {genre}
          </UsernameInput>
        </div>

        <div>
          <UsernameInput>
            {photoURLInput}
          </UsernameInput>
        </div>

        <div>
          <UsernameInput>
            {emailInput}
          </UsernameInput>
        </div>

        <div>
        {signUp}
        {cancel}
        </div>
        </LoginPage>

      );

}
}
export default SignUp;
