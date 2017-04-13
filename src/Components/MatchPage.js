/*
  MatchPage.js

  This provides the implementation for the MatchPage component.

  MatchPage maintains state in the form of currentLogin and currentArtist
    -currentLogin stores an id
    -currentArtist stores the idex in the array of data of the artist object we are looking at


*/
import React, { Component } from 'react';
import styled from 'styled-components';
import data from '../../public/sounderUsers.json';


const ArtistName=styled.li`
  display:inline;
  text-align: right;
  padding: 5px;
  color: #ff7700;
  font-size: 24px;
  font-style: italic;
`;
const ArtistFollowers=styled.li`
  display:inline;
  text-align: center;
  padding: 5px;
  color: #ff7700;
  font-size: 16px;
`;
const Button = styled.button`
  background-color: #525252;
  border: none;
  color: white;
  padding: 10px 20px 10px 20px;
  border: none;
  color: white;
  margin-right: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 28px;
  font-size: 16px;
  &:hover {
   background-color:#FF7700;
 }
`;

const CenteredTitle=styled.h1`
  text-align: center;
`;



function ArtistTile(props){
  /*Create the Artist tiles based off whoever the currentArtist is*/
  const artist = props.artist;
  let artistInfo = [];
  const numberOfFollowers=artist['followers'].length;
  const artistName = artist['username'];
  artistInfo.push((<div><ArtistName key={artistName}> {artistName}</ArtistName></div>));
  artistInfo.push((<div><ArtistFollowers key={artistName + "-" + numberOfFollowers}> {numberOfFollowers + " Followers"}</ArtistFollowers></div>));


  return (
    <div>
    <span>
    <img src="https://pbs.twimg.com/profile_images/503711643378155522/yi8jEioQ.jpeg" width="160px" height="160px" />
    {artistInfo}
    </span>
    </div>
  )

}

function SongTiles(props){
  /*Create the song tiles based off whoever the currentArtist is*/
  const songs = props.songs;
  let songBoxes = [];
  for (let i = 0; i < songs.length; i++){
       songBoxes.push((<li key={songs[i]}> {songs[i]}</li>))
  }

  return (
    <div>
    {songBoxes}
    </div>
  )

}


class MatchPage extends Component{
  constructor(props){
    super(props);

    this.state = {
      currentLogin: this.props.userObject.id,
      currentArtist: 1
    };
  }

  handleLike(){
    const numberOfArtists = data.length;
    const userid = this.props.userObject.id;
    /*Adds currentAritst to currentLogin’s property PeopleYouLike */
    console.log(data);
    console.log(this.props.userObject);
    console.log(this.state.currentArtist);
    // for(let i = 0; i < numberOfArtists; i++){
    //     (data[i]['peopleYouLike']).push(data[this.state.currentArtist]['id']);
    //     console.log(data[i]['peopleYouLike']);
    //     for (let j=0; j<data[i]['peopleWhoLikedYou'].length; j++){
    //       if (data[this.state.currentArtist]['id'] === data[i]['peopleWhoLikedYou'][j]){
    //         data[i]['currentMatches'].push(data[this.state.currentArtist]['id']);
    //         console.log(data[i]['currentMatches']);
    //       };
    //     };
    //
    // };



    for(let i = 0; i < numberOfArtists; i++){
      /*Adds currentLogin to currentArtist’s property PeopleWhoLikeYou*/
      if(data[i]['id'] == data[this.state.currentArtist]['id']){
          (data[i]['peopleWhoLikedYou']).push(this.state.currentLogin);
          console.log(data[i]['peopleWhoLikedYou']);
      }
    }
    /*Updates state of currentArtist to be the next artist in the array*/
    this.setState({currentArtist:(this.state.currentArtist + 1)});

  }


  handleNext(){
    /*Updates state of currentArtist to be the next artist in the array*/
    this.setState({currentArtist:(this.state.currentArtist + 1)});
  }

  render(){

    const numberOfArtists = data.length;
    let currentArtistsSongs;
    for(let i = 0; i < numberOfArtists; i++){
      if(data[i]['id'] == data[this.state.currentArtist]['id']){
          currentArtistsSongs = data[i]['songs'];
      }
    }


    const songTiles = (<SongTiles songs={currentArtistsSongs} />);
    const artistTile = (<ArtistTile artist={data[this.state.currentArtist]}/>)

    return(
      <CenteredTitle>
        <ul>{artistTile}</ul>
        {songTiles}
        <CenteredTitle>
        <Button onClick={()=>this.handleNext()} value="Next">Next</Button>
        <Button onClick={()=>this.handleLike()} value="Like">Like</Button>
        <Button value="Back to Home" onClick={()=>this.props.setMode()}>Back To Home</Button>
        </CenteredTitle>
      </CenteredTitle>


    );
  }
}



export default MatchPage;
