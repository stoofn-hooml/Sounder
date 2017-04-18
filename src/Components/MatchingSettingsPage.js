/*
  MatchingSettingsPAge.js

  This provides the implementation for the profile component.

*/
import DropdownButton from 'react-bootstrap/lib/DropdownButton.js'
import MenuItem from 'react-bootstrap/lib/MenuItem.js'
import React, { Component } from 'react';
import data from "../../public/sounderUsers.json";
import Button from 'react-bootstrap/lib/Button.js';
import Grid from 'react-bootstrap/lib/Grid.js';
import Row from 'react-bootstrap/lib/Row.js';
import Col from 'react-bootstrap/lib/Col.js';



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
              <MenuItem eventKey= '1'> Alternative Rock </MenuItem>
              <MenuItem eventKey= '2'> Ambient </MenuItem>
              <MenuItem eventKey= '3'> Classical </MenuItem>
              <MenuItem eventKey= '4'> Country </MenuItem>
              <MenuItem eventKey= '5'> Dance & EDM </MenuItem>
              <MenuItem eventKey= '6'> Dancehall </MenuItem>
              <MenuItem eventKey= '7'> Deep House </MenuItem>
              <MenuItem eventKey= '8'> Disco </MenuItem>
              <MenuItem eventKey= '9'> Drum & Bass </MenuItem>
              <MenuItem eventKey= '10'> Dubstep </MenuItem>
              <MenuItem eventKey= '11'> Electronic </MenuItem>
              <MenuItem eventKey= '12'> Folk & Singer-Songwriter </MenuItem>
              <MenuItem eventKey= '13'> Hip-Hop & Rap </MenuItem>
              <MenuItem eventKey= '14'> House </MenuItem>
              <MenuItem eventKey= '15'> Indie </MenuItem>
              <MenuItem eventKey= '16'> Jazz & Blues </MenuItem>
              <MenuItem eventKey= '17'> Latin </MenuItem>
              <MenuItem eventKey= '18'> Metal </MenuItem>
              <MenuItem eventKey= '19'> Piano </MenuItem>
              <MenuItem eventKey= '20'> Pop </MenuItem>
              <MenuItem eventKey= '21'> R&B & Soul </MenuItem>
              <MenuItem eventKey= '22'> Reggae</MenuItem>
              <MenuItem eventKey= '23'> Reggaeton </MenuItem>
              <MenuItem eventKey= '24'> Rock </MenuItem>
              <MenuItem eventKey= '25'> Soundtrack </MenuItem>
              <MenuItem eventKey= '26'> Techno </MenuItem>
              <MenuItem eventKey= '27'> Trance </MenuItem>
              <MenuItem eventKey= '28'> Trap </MenuItem>
              <MenuItem eventKey= '29'> Triphop </MenuItem>
              <MenuItem eventKey= '30'> World </MenuItem>
              </DropdownButton>)
      return(
        <Grid>
          <Row bsClass="topRow">
            <h1>
            Matching Settings
            </h1>
              <Row bsClass="middleRow">
                <div id="slider" >
                  <h5 style={{display: 'inline'}}> Follower Range </h5>
                  {minFollowers}
                  <p style={{display: 'inline'}}> to </p>
                  {maxFollowers}
                </div>
              </Row>
              <Row bsClass="middleRow">
                <div>
                  {genre}
                </div>
              </Row>
              <Button value="Back to Home" onClick={()=>this.props.setMode()}>Back To Home</Button>
          </Row>
        </Grid>

      );

  }
}

export default MatchingSettings;
