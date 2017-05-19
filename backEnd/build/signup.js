console.log("checking sign up form");
function validateForm() {
    console.log("hello")
    var x = document.forms["myForm"]["username"].value;
    console.log(x);
    var song1 = document.forms["myForm"]["song1"].value;
    var song2 = document.forms["myForm"]["song2"].value;
    var song3 = document.forms["myForm"]["song3"].value;
    var profilePictureURL = document.forms["myForm"]["profilePictureURL"].value;
if (song1.search("w.soundcloud.com/player/") == -1 ||
    song1.search("tracks") == -1){ //Checks if the song is a valid code and not a playlist
       alert("Please insert a valid embed code for song 1!");
   }
   if (song2.search("w.soundcloud.com/player/") == -1 ||
       song2.search("tracks") == -1){ //Checks if the song is a valid code and not a playlist
       alert("Please insert a valid embed code for song 2!");
   }
   if (song3.search("w.soundcloud.com/player/") == -1 ||
        song3.search("tracks") == -1){ //Checks if the song is a valid code and not a playlist
       alert("Please insert a valid embed code for song 3!");
   }
   if (profilePictureURL.search(".jpg") == -1 && profilePictureURL.search(".png") == -1){ //Image URL should end in .jpg or .png
       alert("Please enter a .jpg or .png file for profile picture!");
   }
}
