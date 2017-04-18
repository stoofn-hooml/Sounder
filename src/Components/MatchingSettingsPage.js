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
      max:1000,
      selectedGenres: []
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
    let minFollowers = (<input style={{display: 'inline'}} id="minFollowers" type="text" size="10" value={this.state.min} onChange={(event)=> {this.handleMin(event)}} />);
    let maxFollowers = (<input style={{display: 'inline'}} id="maxFollowers" type="text" size="10" value={this.state.max} onChange={(event)=> {this.handleMax(event)}} />);
    let genreOps = ["Alternative Rock", "Ambient", "Classical", "Country", "Dance & EDM", "Dancehall", "Deep House",
    "Disco", "Drum & Bass", "Dubstep", "Electronic", "Folk & Singer-Songwriter", "Hip-Hop & Rap", "House", "Indie", "Jazz & Blues", "Latin",
    "Metal", "Piano", "Pop", "R&B & Soul", "Reggae", "Reggaeton", "Rock", "Soundtrack", "Techno", "Trance", "Trap", "Triphop", "World"]

    let counter = 0;
    const genrelist = (genreOps).map((genrei)=>{ //creates a genrelist that is displayed in the "Genre" dropdown
      counter += 1;
      return (<MenuItem eventKey={counter} onClick={()=>{console.log(genrei)}}> {genrei} </MenuItem>);});

    let genre = (<DropdownButton title='Genres' id='genre-dropdown'>
              {genrelist}
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

          </Row>
        </Grid>

      );

  }
}

export default MatchingSettings;
