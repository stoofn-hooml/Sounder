/*

EmbedSong.js

EmbedSong.js takes in one prop: songURL
-songURL provides a URL to a soundcloud song, which is then used to display
the embedded song window from soundcloud

*/

import React from 'react';

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
    if (props.songURL){
    return(
      <div>
      <p>Please enter valid URL!</p>
      </div>
    )
    }else{
      return(
        <div>
        <p>{props.songURL}</p>
        </div>
      )
    }
  }

};

export default EmbedSong;
