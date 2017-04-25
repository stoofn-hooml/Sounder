/*

EmbedSong.js

EmbedSong.js takes in one prop: songURL
-songURL provides a URL to a soundcloud song, which is then used to display
the embedded song window from soundcloud

*/

import React from 'react';

function EmbedSong(props){
  console.log(props);
  let songString = props.songURL.split('src=');
  let songNotFinal = songString[1].split(">");
  let songFinal = songNotFinal[0];
  console.log(songNotFinal);
  console.log(songFinal);
  let isong = (<iframe width="100%" height="150" scrolling="no" frameBorder="no"
  src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/248839502&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true" ></iframe>);
  return(
    <div>
    {isong}
    </div>


  );
};

export default EmbedSong;
