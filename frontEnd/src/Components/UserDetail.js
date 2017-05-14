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
    this.state = {
      showModal: false,
      karmaModal: false,
      karma: [37,78]
    };
  }

  createKarma(rating){
    if (this.props.currentLogin.totalRatings ===0){
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
    this.updateRating(event)
    let updatedUserObj;

    if (this.state.currentRating === 0) {
      if (this.state.newRating === 1){

        updatedUserObj = Object.assign({}, this.props.currentLogin, {
          thumbsUpTotal:this.props.currentLogin.thumbsUpTotal +1,
          totalRatings:this.props.currentLogin.totalRatings +1
        });
      };
      if (this.state.newRating === 2){
        updatedUserObj = Object.assign({}, this.props.currentLogin, {
          thumbsUpTotal:this.props.currentLogin.thumbsUpTotal,
          totalRatings:this.props.currentLogin.totalRatings +1
        });
      };
    }

    if (this.state.currentRating === 1) {
      if (this.state.newRating === 1){
        alert("You have already given this user a Thumbs Up!")
      };
      if (this.state.newRating === 2){
        updatedUserObj = Object.assign({}, this.props.currentLogin, {
          thumbsUpTotal:this.props.currentLogin.thumbsUpTotal - 1,
          totalRatings:this.props.currentLogin.totalRatings
        });
      };
    }

    if (this.state.currentRating === 2) {
      if (this.state.newRating === 1){

        updatedUserObj = Object.assign({}, this.props.currentLogin, {
          thumbsUpTotal:this.props.currentLogin.thumbsUpTotal +1,
          totalRatings:this.props.currentLogin.totalRatings
        });
      };
      if (this.state.newRating === 2){
        alert("You have already given this user a Thumbs Down!")
      };
    }
    this.props.updateUserKarma(updatedUserObj);
  };

// This helper function has two purposes:
// (1) Set up state to make the correct changes to karma rating in handleKarmaRating function
// (2) Create correct newMatchObject to return to App.js to be PUT in database in matches table
updateRating(event){
  let match = this.props.getMatch
  console.log(match)
  let newRating;
  let matchObject = {}
  let user_id_rating = match.user_id_rating
  let matched_id_rating = match.matched_id_rating

  if (event.target.value === "Thumbs Up") {
    this.setState({newRating: 1});
  }else if (event.target.value === "Thumbs Down"){
    this.setState({newRating: 2});
  }

  if (match.user_id === this.props.currentLogin.id) {
    this.setState({ratingToChange: 0})
    // Hasn't been rated yet, make the change to new rating regardless
    if (matched_id_rating === 0){
      this.setState({currentRating: 0})
      matchObject = Object.assign({}, matchObject, {user_id_rating:this.state.newRating})
    }

    // Has been rated "Thumbs Up", make the change to new rating if they chose "Thumbs Down" (2)
    if (matched_id_rating === 1){
      this.setState({currentRating: 1})
      if (newRating === 2){
        matchObject = Object.assign({}, matchObject, {user_id_rating:this.state.newRating})
      }
    }

    // Has been rated "Thumbs Down", make the change to new rating if they chose "Thumbs Up" (1)
    if (matched_id_rating === 2){
      this.setState({currentRating: 2})
      if (newRating === 1){
        matchObject = Object.assign({}, matchObject, {user_id_rating:this.state.newRating})
      }
    }

  }else{
    this.setState({ratingToChange: 1})
    // Hasn't been rated yet, make the change to new rating regardless
    if (user_id_rating === 0){
      this.setState({currentRating: 0})
      matchObject = Object.assign({}, matchObject, {matched_id_rating:this.state.newRating})
    }

    // Has been rated "Thumbs Up", make the change to new rating if they chose "Thumbs Down" (2)
    if (user_id_rating === 1){
      this.setState({currentRating: 1})
      if (newRating === 2){
        matchObject = Object.assign({}, matchObject, {matched_id_rating:this.state.newRating})
      }
    }

    // Has been rated "Thumbs Down", make the change to new rating if they chose "Thumbs Up" (1)
    if (user_id_rating === 2){
      this.setState({currentRating: 2})
      if (newRating === 1){
        matchObject = Object.assign({}, matchObject, {matched_id_rating:this.state.newRating})
      }
    }
  }
  this.props.updateMatchKarma(matchObject);
}

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
  //Modal that directs you how to repost
  let repostModal = (<Modal show={this.state.showModal} onHide={closeModal} container={this} aria-labelledby="contained-modal-title">
                        <Modal.Header closeButton>
                          <Modal.Title id="contained-modal-title">Repost one of your Match&apos;s Songs!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p> To repost a song, simply click on the orange SoundCloud icon in the top right corner of the song widget.
                            This will bring you to a page which will allow you to directly repost on SoundCloud.</p>
                            <img role='presentation' src="https://preview.ibb.co/hMm6bQ/Screen_Shot_2017_05_10_at_11_03_22_PM.png" width="580px" height="150px"/>
                            <h4> Don&apos;t Forget to Repost! </h4>
                            <p>Make sure you remember to repost, otherwise your match will give you a bad karma rating. </p>
                        </Modal.Body>
                      </Modal>);

  //Modal that Takes you to the Karma rating system
  let KarmaModal = (<Modal show={this.state.karmaModal} container={this} aria-labelledby="contained-modal-title">
                    <Modal.Header>
                    <Modal.Title id="contained-modal-title">Rate this user based on whether they have reposted you or not!</Modal.Title>
                    </Modal.Header>
                      <Modal.Body>
                      <form>
                        <div className="radio">
                            <label>
                            <input type="radio" value="Thumbs Up" name="karma" onClick={(event)=> this.handleKarmaRating(event)} />
                            Yes, They Reposted Me!
                            </label>
                        </div>
                        <div className="radio">
                            <label>
                            <input type="radio" value="Thumbs Down" name="karma" onClick={(event)=> this.handleKarmaRating(event)} />
                            No, They Did Not Repost Me!
                            </label>
                        </div>
                      </form>
                      </Modal.Body>
                      <Modal.Footer>
                            <button type="button" class="btn btn-primary" onClick={()=> this.setState({karmaModal:false})} >Done</button>
                      </Modal.Footer>
                    </Modal>);

    //buttons that will display at the top of the screen
    let goToProfile = (<LoginButton onClick={()=>(window.open(this.props.currentLogin.profileURL))}>Visit SoundCloud Profile</LoginButton>)
    let repostModalButton = (<LoginButton onClick={() => this.setState({ showModal: true})}>How do I repost a Song?</LoginButton>)
    let karmaModalButton = (<LoginButton onClick={() => this.setState({ karmaModal: true})}>Rate this User</LoginButton>)


    /*Checks to see if the User is looking at MatchDetailPage*/
    if(this.props.profileLink){
        return(
        <Grid fluid={true}>
            <Row bsClass="padded">
              <div className="modal-container">
                      {goToProfile}
                      {repostModalButton}
                      {karmaModalButton}
                      {repostModal}
                      {KarmaModal}

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
              <Col lg={9} md={6}>
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
              <Col lg={9} md={6}>
                {songs}
              </Col>
          </Grid>
        )
      }

   }
};

  export default UserDetail;
