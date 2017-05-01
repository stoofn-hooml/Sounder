/*
  MatchingSettingsPAge.js

  This provides the implementation for the profile component.

*/
import DropdownButton from 'react-bootstrap/lib/DropdownButton.js'
import MenuItem from 'react-bootstrap/lib/MenuItem.js'
import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button.js';
import Grid from 'react-bootstrap/lib/Grid.js';
import Row from 'react-bootstrap/lib/Row.js';
import Col from 'react-bootstrap/lib/Col.js';
import EmbedSong from './EmbedSong.js';


class MatchingSettings extends Component{
  constructor(props){
    super(props);

    this.state = {
      min:0,
      max:1000,
      selectedGenres: [],
      song1: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/106276300&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true",
      song2: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/196990901&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true",
      song3: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/274807237&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true",
      profileURL: "https://soundcloud.com/username1"
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

  handleURL(inputEvent){
    const songNum = inputEvent.target.name;
    const url = inputEvent.target.value;
    this.setState({[songNum]: url});
    console.log("changed URL")
  }

  handleProfile(inputEvent){
      this.setState({profileURL: inputEvent.target.value});
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
            <Col lg={6} md={6}>
              <h1>Account Settings</h1>
                <Row bsClass="middleRow">
                  <h5 style={{display: 'inline'}}> SoundCloud Profile: </h5>
                  <input style={{display: 'inline'}} name="profileURL" type="text" size="auto" value={this.state.profileURL} onChange={(event)=>{this.handleProfile(event)}} />
                </Row>
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
                <Row bsClass="middleRow">
                  <Button bsStyle="primary">Save</Button>
                </Row>
              </Col>
              <Col lg={6} md={6}>
                <Row>
                  <EmbedSong songURL={this.props.currentLogin.song1}></EmbedSong>
                  <h5 style={{display: 'inline'}}> URL </h5>
                  <input style={{display: 'inline'}} name="song1" type="text" size="auto" value={this.state.song1} onChange={(event)=> {this.handleURL(event)}} />
                </Row>
                <Row bsClass="middleRow">
                  <EmbedSong songURL={this.props.currentLogin.song2}></EmbedSong>
                  <h5 style={{display: 'inline'}}> URL </h5>
                  <input style={{display: 'inline'}} name="song2" type="text" size="auto" value={this.state.song2} onChange={(event)=> {this.handleURL(event)}} />
                </Row>
                <Row bsClass="middleRow">
                  <EmbedSong songURL={this.props.currentLogin.song3}></EmbedSong>
                  <h5 style={{display: 'inline'}}> URL </h5>
                  <input style={{display: 'inline'}} name="song3" type="text" size="auto" value={this.state.song3} onChange={(event)=> {this.handleURL(event)}} />
                </Row>
              </Col>
          </Row>
        </Grid>

      );

  }
}

export default MatchingSettings;
