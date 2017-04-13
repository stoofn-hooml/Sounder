/*
  MatchingSettings.js

  This provides the implementation for the profile component.

*/


import React, { Component } from 'react';
import data from "../../public/sounderUsers.json";

class MatchingSettings extends Component{
  constructor(){
    super();

  };




  render() {
  //  let followerRange =
      return(
        <div>
          <h1>
          Matching Settings
          </h1>



          <div id="slider">
          <input id="slide" type="range" min="5" max="200" step="1"
          value="1"/>
          </div>

        </div>
      );

  }
}

export default MatchingSettings;
