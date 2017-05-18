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
import styled from 'styled-components';

const CenteredTitle=styled.h2`
  font-weight: bold;
  border-bottom: 2px solid #ff4b00;
  padding-bottom: 10px;
  width: 250px;
`;

const SettingsHeader=styled.h4`
  font-weight: bold;
  padding-bottom: 10px;
  font-size: 16px;
`;

const LoginButton = styled.div`
  bsSize: xsmall;
  display: inline;
  background-color: #e7e7e7;
  border: none;
  color: white;
  padding: 5px 5px 5px 5px;
  color: black;
  margin-left: 10px;
  border-radius: 28px;
  text-align: center;

`;




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
      this.setState({genre: genre});
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
    this.setState({ value });
  }


  render() {
    //Code for tool tip funcitonality 
    const help = <LoginButton bsSize="xsmall" style={{display: 'inline'}}> ? </LoginButton>

    const proPicToolTip = (
        <Tooltip id="tooltip" style={{fontSize: '12pt'}}> Copy and paste the URL of your new profile picture. </Tooltip>
    );

    const proPicHelp = (
      <OverlayTrigger placement="top" overlay={proPicToolTip}>
        {help}
        </OverlayTrigger>
      );

    const followerToolTip = (
          <Tooltip id="tooltip" style={{fontSize: '12pt'}}> Enter the range of followers you would like your potential matches to have. </Tooltip>
      );

    const followerHelp = (
        <OverlayTrigger placement="right" overlay={followerToolTip}>
          {help}
          </OverlayTrigger>
        );

    const genreToolTip = (
          <Tooltip id="tooltip" style={{fontSize: '12pt'}}> Pick which genres you would like your potential matches to have. </Tooltip>
        );

    const genreHelp = (
          <OverlayTrigger placement="right" overlay={genreToolTip}>
            {help}
            </OverlayTrigger>
        );

    const songToolTip = (
            <Tooltip id="tooltip" style={{fontSize: '12pt'}}> To change your one of your songs, click the share button on the SoundCloud song widget. Click the 'Embed' tab. Copy and paste the 'Code and Preview' text below the song you want to change. </Tooltip>
        );

    const songHelp = (
          <OverlayTrigger placement="right" overlay={songToolTip}>
            {help}
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
              <SettingsHeader>Edit your profile picture
              {proPicHelp}
              </SettingsHeader>
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

    let genre = (<MultiGenreSelect style={{display: 'inline'}}
                  handleSelectChange={(value)=>this.handleSelectChange(value)}
                  value={this.state.value}>
                </MultiGenreSelect>
                )

      return(
        <Grid>
          <Row bsClass="topRow">
            <Col lg={6} md={6}>
              <CenteredTitle>Account Settings</CenteredTitle>
                <Row bsClass="middleRow">
                  {profilePicture}
                </Row>
                <Row bsClass="middleRow">
                  <div id="slider" >
                    <SettingsHeader>
                    Follower Range
                    {followerHelp}
                    </SettingsHeader>
                    {minFollowers}
                    <p style={{display: 'inline'}}> to </p>
                    {maxFollowers}
                  </div>
                </Row>
                <Row bsClass="middleRow">
                  <SettingsHeader>
                  Genres
                  {genreHelp}
                  </SettingsHeader>
                  <div style={{paddingRight:'150px'}}>
                    {genre}
                  </div>
                </Row>
                <Row bsClass="middleRow">
                  <Button bsStyle="primary" onClick={(event)=> {this.handleSave()}}>Save</Button>
                </Row>
              </Col>
              <Col lg={6} md={6}>
                <SettingsHeader>
                Edit my Songs
                {songHelp}
                </SettingsHeader>
                <Row bsClass="padded">
                  <EmbedSong songURL={this.props.currentLogin.song1}></EmbedSong>
                  <h4 style={{display: 'inline'}}> URL </h4>
                  <input style={{display: 'inline'}} name="song1" type="text" size="auto" value={this.state.song1} onChange={(event)=> {this.handleURL(event)}} />
                </Row>
                <Row bsClass="padded">
                  <EmbedSong songURL={this.props.currentLogin.song2}></EmbedSong>
                  <h4 style={{display: 'inline'}}> URL </h4>
                  <input style={{display: 'inline'}} name="song2" type="text" size="auto" value={this.state.song2} onChange={(event)=> {this.handleURL(event)}} />
                </Row>
                <Row bsClass="padded">
                  <EmbedSong songURL={this.props.currentLogin.song3}></EmbedSong>
                  <h4 style={{display: 'inline'}}> URL </h4>
                  <input style={{display: 'inline'}} name="song3" type="text" size="auto" value={this.state.song3} onChange={(event)=> {this.handleURL(event)}} />
                </Row>
              </Col>
          </Row>
        </Grid>

      );

  }
}

export default MatchingSettings;
