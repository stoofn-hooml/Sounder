/*

EmbedSong.js

EmbedSong.js takes in one prop: songURL
-songURL provides a URL to a soundcloud song, which is then used to display
the embedded song window from soundcloud

*/

import React from 'react';
import styled from 'styled-components';


const Song = styled.p`
  margin: 10px 0px 10px 0px;
`
function EmbedSong(props){
  if(props.songURL && (props.songURL).length >= 20){
    let songString = props.songURL.split('src="');
    let songNotFinal = songString[1].split('"');
    let songFinal = songNotFinal[0];
    let isong = (<iframe width="100%" height="150" scrolling="no" frameBorder="no"
    src={songFinal} ></iframe>);
    return(
      <div>
      {isong}
      </div>


    );

  }
  else{
    return(
      <div>
      <Song>{props.songURL}</Song>
      </div>
    )
  }

};

export default EmbedSong;
