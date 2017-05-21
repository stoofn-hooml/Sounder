console.log("checking sign up form");
function validateForm() {
    console.log("hello")
    var x = document.forms["myForm"]["username"].value;
    console.log(x);
    var profilePictureURL = document.forms["myForm"]["profilePictureURL"].value;
    var numFollowers = document.forms["myForm"]["numFollowers"].value;
    var song1 = document.forms["myForm"]["song1"].value;
    var song2 = document.forms["myForm"]["song2"].value;
    var song3 = document.forms["myForm"]["song3"].value;
    var password = document.forms["myForm"]["password"].value;
    var password2 = document.forms["myForm"]["password2"].value;
    if(isNaN(numFollowers)){
        alert("Please enter a valid number of SoundCloud Followers!");
    }
    if (profilePictureURL.search(".jpg") == -1 && profilePictureURL.search(".png") == -1){ //Image URL should end in .jpg or .png
        alert("Please enter a .jpg or .png file for profile picture!");
    }
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
   if(password !== password2) { //checks that password/confirm password match
     alert("Passwords do not match, please confirm password")
   }

}
