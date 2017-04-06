/*
  profile.js

  This provides the implementation for the profile component.
  
*/


import React, { Component } from 'react';
import data from "../../public/sounderUsers.json";

class Profile extends Component{
  constructor(){
    super();

    console.log(data);
    this.state = {
      username: '',
    }
  };

  render() {
    return(
      <div>
      </div>
    );
  }
}

export default Profile;
