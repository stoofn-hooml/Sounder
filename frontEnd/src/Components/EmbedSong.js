/*

EmbedSong.js

EmbedSong.js takes in one prop: songURL
-songURL provides a URL to a soundcloud song, which is then used to display
the embedded song window from soundcloud

*/

import React from 'react';

function EmbedSong(props){

  /* Below we check to make sure a valid embed code is input to prevent split
     methods from breaking on improper input */
  if (!props.songURL) {
    return(
      <div>
      <p>{props.songURL}</p>
      </div>
    )
  }

  else if(props.songURL.length >= 20){

    if (props.songURL.search("w.soundcloud.com/player/") === -1 ||
      props.songURL.search("tracks") === -1){ //Checks if the song is a valid code and not a playlist
        return(
          <div>
          <p>Please enter valid URL!</p>
          </div>
        )
    }else{
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

  }else{
    return(
      <div>
      <p>Please enter valid URL!</p>
      </div>
    )
  }
};

export default EmbedSong;
