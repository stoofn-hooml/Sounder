/*
  MatchingSettingsPage.js

  This provides the implementation for the profile component.

*/
import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button.js';
import Grid from 'react-bootstrap/lib/Grid.js';
import Row from 'react-bootstrap/lib/Row.js';
import Col from 'react-bootstrap/lib/Col.js';
import EmbedSong from './EmbedSong.js';
import Image from 'react-bootstrap/lib/Image.js';
import MultiGenreSelect from './MultiGenreSelect.js';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger.js';
import Tooltip from 'react-bootstrap/lib/Tooltip.js';



class MatchingSettings extends Component{
  constructor(props){
    super();

    this.state = {
      min:props.currentLogin.followerRangeMin,
      max:props.currentLogin.followerRangeMax,
      genre: props.currentLogin.genre,
      song1: props.currentLogin.song1,
      song2: props.currentLogin.song2,
      song3: props.currentLogin.song3,
      profileURL: props.currentLogin.profilePictureURL,
      value: props.currentLogin.genre,
    }
  };


  handleMin(inputEvent){
    this.setState({min: inputEvent.target.value});
  }

  handleMax(inputEvent){
    this.setState({max: inputEvent.target.value});
  }

  handleURL(inputEvent){
    const songNum = inputEvent.target.name;
    const url = inputEvent.target.value;
    this.setState({[songNum]: url});
  }

  handleProfile(inputEvent){
      this.setState({profileURL: inputEvent.target.value});
  }

  handleGenre(genre){
      console.log(genre);
      this.setState({genre: genre});
      console.log(this.state.genre)
  }

  handleSave(){ //sends the updatedUserObj back up to App.js
    let updatedUserObj = Object.assign({}, this.props.currentLogin, {
      followerRangeMin:this.state.min,
      followerRangeMax:this.state.max,
      genre: this.state.value,
      song1: this.state.song1,
      song2: this.state.song2,
      song3: this.state.song3,
      profilePictureURL: this.state.profileURL
    });
    this.props.updateSettings(updatedUserObj);
    alert("Changes Saved!")
  }

  handleSelectChange (value) {
    console.log('You\'ve selected:', value);
    this.setState({ value });
  }


  render() {

    const tooltip = (
        <Tooltip id="tooltip"><strong>Holy guacamole!</strong> Check this info.</Tooltip>
    );

    const positionerInstance = (
      <OverlayTrigger placement="left" overlay={tooltip}>
        <Button bsStyle="default">Holy guacamole!</Button>
        </OverlayTrigger>
      );

    let profilePicture = (
      <Grid>
        <Col lg={2} md={2}>
          <Image src={this.state.profileURL}  circle width="114px" height="114px">
          </Image>
        </Col>
        <Col lg={10} md={10}>
          <Row>
            <h5>
              Edit profile picture
            </h5>
            <Button> Holy guacamole!</Button>
          </Row>
          <Row><input style={{display: 'inline'}} id="profileURL" type="text"
                      width="50px" size="auto" value={this.state.profileURL}
                      onChange={(event)=>{this.handleProfile(event)}}>
                </input>
          </Row>
        </Col>
      </Grid>);

    let minFollowers = (<input style={{display: 'inline'}} id="minFollowers"
                                type="text" size="10" value={this.state.min}
                                onChange={(event)=>{this.handleMin(event)}}>
                                </input>);

    let maxFollowers = (<input style={{display: 'inline'}} id="maxFollowers" type="text" size="10" value={this.state.max} onChange={(event)=>{this.handleMax(event)}} />);

    let counter = 0;

    let genre = (<MultiGenreSelect style={{paddingRight: '20px'}}
                  handleSelectChange={(value)=>this.handleSelectChange(value)}
                  value={this.state.value}>
                </MultiGenreSelect>
                )


      return(
        <Grid>
          <Row bsClass="topRow">
            <Col lg={6} md={6}>
              <h1>Account Settings</h1>
                <Row bsClass="middleRow">
                  {profilePicture}
                  {positionerInstance}
                </Row>
                <Row bsClass="middleRow">
                  <div id="slider" >
                    <h5 style={{display: 'inline'}}>
                    Follower Range
                    </h5>
                    {minFollowers}
                    <p style={{display: 'inline'}}> to </p>
                    {maxFollowers}
                  </div>
                </Row>
                <Row bsClass="middleRow">
                  <div style={{paddingRight:'150px'}}>
                    {genre}
                  </div>
                </Row>
                <Row bsClass="middleRow">
                  <Button bsStyle="primary" onClick={(event)=> {this.handleSave()}}>Save</Button>
                </Row>
              </Col>
              <Col lg={6} md={6}>
                <Row bsClass="padded">
                  <EmbedSong songURL={this.props.currentLogin.song1}></EmbedSong>
                  <h5 style={{display: 'inline'}}> URL </h5>
                  <input style={{display: 'inline'}} name="song1" type="text" size="auto" value={this.state.song1} onChange={(event)=> {this.handleURL(event)}} />
                </Row>
                <Row bsClass="padded">
                  <EmbedSong songURL={this.props.currentLogin.song2}></EmbedSong>
                  <h5 style={{display: 'inline'}}> URL </h5>
                  <input style={{display: 'inline'}} name="song2" type="text" size="auto" value={this.state.song2} onChange={(event)=> {this.handleURL(event)}} />
                </Row>
                <Row bsClass="padded">
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
