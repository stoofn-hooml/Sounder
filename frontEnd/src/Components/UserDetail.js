/*
  UserDetail.js

  UserDetail maintains state in the form of showModal.
    -showModal determines if the modal should be displayed or not.

  UserDetail takes in one prop: currentLogin and profileLink
  -currentLogin is an object that stores the account information for the person who is currently logged in.
  -profileLink is a link to the SoundCloud profile of the person whose profile we are viewing

*/

import React, { Component } from 'react';
import styled from 'styled-components';
import Grid from 'react-bootstrap/lib/Grid.js';
import Row from 'react-bootstrap/lib/Row.js';
import Col from 'react-bootstrap/lib/Col.js';
import Modal from 'react-bootstrap/lib/Modal.js';
import Image from 'react-bootstrap/lib/Image.js';
import EmbedSong from './EmbedSong.js';
import Glyphicon from 'react-bootstrap/lib/Glyphicon.js';

const UsernameRow = styled(Row)`
  color: #ff7700;
  font-size: 24px;
  padding: 0;
`;

const UserDetailRow = styled(Row)`
  font-weight: bold;
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


class UserDetail extends Component{
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      showModal: false,
      karma: [37,78]
    };
  }

  createKarma(rating){
    if (this.props.currentLogin.totalRatings ===0){
      console.log('no ratings yet');
      return(
        <div>
        <p>No Ratings Yet</p>
      </div>
    )}
    else if (this.props.currentLogin.thumbsUpTotal/this.props.currentLogin.totalRatings > 0.8){
      return(
        <div>
        <Glyphicon glyph="star" /><Glyphicon glyph="star" /><Glyphicon glyph="star" /><Glyphicon glyph="star" /><Glyphicon glyph="star" />
      </div>
    )}
    else if (this.props.currentLogin.thumbsUpTotal/this.props.currentLogin.totalRatings > 0.6){
      return(
        <div>
        <Glyphicon glyph="star" /><Glyphicon glyph="star" /><Glyphicon glyph="star" /><Glyphicon glyph="star" /><Glyphicon glyph="star-empty" />
      </div>
    )}
    else if (this.props.currentLogin.thumbsUpTotal/this.props.currentLogin.totalRatings > 0.4){
      return(
        <div>
        <Glyphicon glyph="star" /><Glyphicon glyph="star" /><Glyphicon glyph="star" /><Glyphicon glyph="star-empty" /><Glyphicon glyph="star-empty" />
      </div>
    )}
    else if (this.props.currentLogin.thumbsUpTotal/this.props.currentLogin.totalRatings > 0.2){
      return(
        <div>
        <Glyphicon glyph="star" /><Glyphicon glyph="star" /><Glyphicon glyph="star-empty" /><Glyphicon glyph="star-empty" /><Glyphicon glyph="star-empty" />
      </div>
    )}
    else{
      return(
        <div>
          <Glyphicon glyph="star" /><Glyphicon glyph="star-empty" /><Glyphicon glyph="star-empty" /><Glyphicon glyph="star-empty" /><Glyphicon glyph="star-empty" />
        </div>
    )}
  };

  handleKarmaRating(event){
    (console.log(event.target.value));
    let updatedUserObj;
    if (event.target.value === "Thumbs Up"){
      updatedUserObj = Object.assign({}, this.props.currentLogin, {
        thumbsUpTotal:this.props.currentLogin.thumbsUpTotal +1,
        totalRatings:this.props.currentLogin.totalRatings +1
      });
    };
    if (event.target.value === "Thumbs Down"){
      updatedUserObj = Object.assign({}, this.props.currentLogin, {
        thumbsUpTotal:this.props.currentLogin.thumbsUpTotal,
        totalRatings:this.props.currentLogin.totalRatings +1
      });
    };
    this.props.updateSettings(updatedUserObj);
    console.log(updatedUserObj);
  };

render(){

  let profilePicture = (<Image src={this.props.currentLogin.profilePictureURL}  circle bsStyle="margin:10px;" width="114px" height="114px" />)
  let karmaScore = (this.createKarma())
  let basicUserInfo = (<div>
                       <UsernameRow >{this.props.currentLogin['username']}</UsernameRow>
                       <UserDetailRow>Genre: {this.props.currentLogin['genre']}</UserDetailRow>
                       <UserDetailRow>Karma Rating: {karmaScore}</UserDetailRow>
                       <UserDetailRow>Followers: {this.props.currentLogin['numFollowers']}</UserDetailRow>
                       </div>)
  let songs = (<div>
              <EmbedSong songURL={this.props.currentLogin.song1} ></EmbedSong>
              <EmbedSong songURL={this.props.currentLogin.song2}></EmbedSong>
              <EmbedSong songURL={this.props.currentLogin.song3}></EmbedSong>
              </div>)

  let closeModal = () => this.setState({ showModal: false })

  let repostModal = (<Modal show={this.state.showModal} onHide={closeModal} container={this} aria-labelledby="contained-modal-title">
                        <Modal.Header closeButton>
                          <Modal.Title id="contained-modal-title">Repost one of your Matchs Songs!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p> To repost a song, simply click on the orange SoundCloud icon in the top left corner of the song widget.
                            This will bring you to a page which will allow you to directly repost on SoundCloud.</p>
                            <h4> Dont Forget to Repost! </h4>
                            <p>Make sure you remember to repost, otherwise your match will give you a bad karma rating. </p>
                        </Modal.Body>
                      </Modal>);

    let goToProfile = (<LoginButton onClick={()=>(window.open(this.props.currentLogin.profileURL))}>Visit SoundCloud Profile</LoginButton>)
    let repostModalButton = (<LoginButton onClick={() => this.setState({ showModal: true})}>How do I repost a Song?</LoginButton>)


    //Adds the karma rating system
    let rateButton = (<form>
                        <div className="radio">
                          <label>
                            <input type="radio" value="Thumbs Up" name="karma" onClick={(event)=> this.handleKarmaRating(event)} />
                            Thumbs Up! Rad!
                          </label>
                        </div>
                        <div className="radio">
                          <label>
                            <input type="radio" value="Thumbs Down" name="karma" onClick={(event)=> this.handleKarmaRating(event)} />
                            Thumbs Down! Yuck!
                          </label>
                        </div>
                      </form>)

    /*Checks to see if the User is looking at MatchDetailPage*/
    if(this.props.profileLink){
        return(
        <Grid fluid={true}>
            <Row bsClass="padded">
              <div className="modal-container">
                      {goToProfile}
                      {repostModalButton}
                      {repostModal}
                      {rateButton}
              </div>
            </Row>
            <Row>
              <Col lg={2} sm={2} >
                {profilePicture}
              </Col>
              <Col lg={7} sm={3} >
              <Grid>
                {basicUserInfo}
              </Grid>
              </Col>
            </Row>
              <Col lg={9} m={6}>
                {songs}
              </Col>
          </Grid>
        )
    }
      /*User is currently looking at their own profile so doesn't need link to profile button or repost Modal*/
      else{
        return(
          <Grid fluid={true}>
            <Row>
              <Col lg={2} sm={2} >
                {profilePicture}
              </Col>
              <Col lg={7} sm={3} >
              <Grid>
                {basicUserInfo}
              </Grid>
              </Col>
            </Row>
              <Col lg={9} m={6}>
                {songs}
              </Col>
          </Grid>
        )
      }

   }
};

  export default UserDetail;
