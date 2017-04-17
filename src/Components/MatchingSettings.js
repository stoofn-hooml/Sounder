/*
  MatchingSettings.js

  This provides the implementation for the profile component.

*/

import DropdownButton from 'react-bootstrap/lib/DropdownButton.js'
import MenuItem from 'react-bootstrap/lib/MenuItem.js'
import React, { Component } from 'react';
import data from "../../public/sounderUsers.json";


class MatchingSettings extends Component{
  constructor(){
    super();
    this.state = {
      min:0,
      max:1000
    }
  };


  handleMin(inputEvent){
    this.setState({min: inputEvent.target.value});
    console.log(this.state);
  }
  handleMax(inputEvent){
    this.setState({max: inputEvent.target.value});
    console.log(this.state);
  }

  render() {

    let minFollowers = (<input style={{display: 'inline'}} id="minFollowers" type="text" value={this.state.min} onChange={(event)=> {this.handleMin(event)}} />);
    let maxFollowers = (<input style={{display: 'inline'}} id="maxFollowers" type="text" value={this.state.max} onChange={(event)=> {this.handleMax(event)}} />);
    let genre = (<DropdownButton title='Genres' id='genre-dropdown'>
              <MenuItem eventKey= '1'> Rap </MenuItem>
              <MenuItem eventKey= '2'> Pop </MenuItem>
              <MenuItem eventKey= '3'> Country </MenuItem>
              </DropdownButton>)
      return(
        <div>
          <h1>
          Matching Settings
          </h1>

          <div id="slider" >
            {minFollowers}
            <p style={{display: 'inline'}}> to </p>
            {maxFollowers}
          </div>

          <div>
            {genre}
          </div>

        </div>
      );

  }
}

export default MatchingSettings;
