/*
  MatchPage.js

  This provides the implementation for the MatchPage component.

  MatchPage maintains state in the form of currentLogin and currentArtist
    -currentLogin stores a username
    -currentArtist stores the idex in the array of data of the artist object we are looking at


*/
import React, { Component } from 'react';
import styled from 'styled-components';
import data from '../../public/sounderUsers.json';

const ArtistProfile=styled.li`
  display:inline;
  padding: 5px;
`;



function ArtistTile(props){
  /*Create the Artist tiles based off whoever the currentArtist is*/
  const artist = props.artist;
  let artistInfo = [];
  const numberOfFollowers=artist['followers'].length;
  const artistName = artist['username']
  artistInfo.push((<ArtistProfile key={artistName + "-" + numberOfFollowers}> {"Followers: " + numberOfFollowers}</ArtistProfile>));
  artistInfo.push((<ArtistProfile key={artistName}> {"Artist: " + artistName}</ArtistProfile>));

  return (
    <div>
    {artistInfo}
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
      currentLogin: 'username1',
      currentArtist: 1
    };
  }

  handleLike(){
    const numberOfArtists = data.length;
    /*Adds currentAritst to currentLogin’s property PeopleYouLike */
    for(let i = 0; i < numberOfArtists; i++){
      if(data[i]['username'] === this.state.currentLogin){
          (data[i]['peopleYouLike']).push(data[this.state.currentArtist]['username']);
          console.log(data[i]['peopleYouLike']);
      }
    }



    for(let i = 0; i < numberOfArtists; i++){
      /*Adds currentLogin to currentArtist’s property PeopleWhoLikeYou*/
      if(data[i]['username'] === data[this.state.currentArtist]['username']){
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
      if(data[i]['username'] === data[this.state.currentArtist]['username']){
          currentArtistsSongs = data[i]['songs'];
      }
    }


    const songTiles = (<SongTiles songs={currentArtistsSongs} />);
    const artistTile = (<ArtistTile artist={data[this.state.currentArtist]}/>)

    return(
      <div>
        <ul>{artistTile}</ul>
        {songTiles}
        <input type="button" onClick={()=>this.handleNext()} value="Next" />
        <input type="button" onClick={()=>this.handleLike()} value="Like" />
        <input type="button" value="Back to Home" onClick={()=>this.props.setMode()}/>
      </div>
    );
  }
}



export default MatchPage;
