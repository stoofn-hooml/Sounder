/*

EmbedSong.js

EmbedSong.js takes in one prop: songURL
-songURL provides a URL to a soundcloud song, which is then used to display
the embedded song window from soundcloud

*/

import React from 'react';

function EmbedSong(props){

  return(
    <iframe width="100%" height="150" scrolling="no" frameBorder="no"
    src={props.songURL} ></iframe>

  );
};

export default EmbedSong;
