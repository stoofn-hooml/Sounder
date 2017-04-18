/*This file allows us to create a JSON file that represents the Sounder database*/

/*This function creates the user object. A user object will store a username, profile picture,
 karma rating, a list of three songs, profile URL, a list of genres tags, an id, a list of followers,
 a list of users the user is following, a selected follower range,  a list of people you liked on Sounder,
  and a list of people who liked you on Sounder, a list of current matches, a list of past matches,
  and an online status.*/
function user(username, profilePicture, numFollowers, karma, songs, profileURL, genre, id, followers, following, followerRange, peopleYouLike, peopleWhoLikedYou, currentMatches, pastMatches, online) {
    /* Public (shown on profile) */
    this.username = username;
    this.profilePicture = profilePicture;
    this.numFollowers = numFollowers;
    this.karma = karma;
    this.songs = songs;
    this.profileURL = profileURL;
    this.genre = genre;
    /* Private (used behind the scenes)*/
    this.id = id;
    this.followers = followers; //who follows the user
    this.following = following; //who the user follows
    this.followerRange = followerRange;
    this.peopleYouLike = peopleYouLike;
    this.peopleWhoLikedYou = peopleWhoLikedYou;
    this.currentMatches = currentMatches;
    this.pastMatches = pastMatches;
    this.online = online;

}
/*Here, we initialize our global variables*/
numberOfUsers = 50;
numberofSongs = 3;
followerRange = 20;
musicGenres = ["Blues", "Country", "Electronic", "Folk", "Hip-hop", "Jazz", "Latin", "Pop", "R&B", "Rock", "EDM", "Alternative", "Trap", "Future-Bass"];
numberOfGenres = musicGenres.length;
sounderUsers = [];

/*Here, we create  our user objects and store them in the list sounderUsers. */
for(i = 1; i <numberOfUsers + 1; i++){
	username = "username" + i;
    id = i;
	songs = [];
	followers = [];
	for(j=1; j < numberofSongs + 1; j++){
		song = "song" + i + "-" + j;
		songs.push(song);
	}
	numberOfFollowers = Math.floor(Math.random() * followerRange);
	for(k = 1; k < numberOfFollowers + 1; k++){
		follower = "follower" + k;
		followers.push(follower);
	}
	randomGenreIndex = Math.floor(Math.random() * numberOfGenres);
	genre = musicGenres[randomGenreIndex];
    karma = Math.floor(Math.random() * 5);
    profileURL = "https://soundcloud.com/" + username;

	/*For now, we will keep the profile Picture, list of following,  peopleYouLike, peopleWhoLikeYou, currentMatches, and pastMatches empty*/
	sounderUsers.push(new user(username, "", numberOfFollowers, karma, songs, profileURL, genre, id, followers, [], followerRange,[], [], [], [], 0));
                /*(username, profilePicture, numFollowers, karma, songs, profileURL, genre, id, followers, following, followerRange, peopleYouLike, peopleWhoLikedYou, currentMatches, pastMatches, online)*/
 }

/*Here, we make our sounderUsers list into a JSON file*/
var myJSON = JSON.stringify(sounderUsers);
console.log(myJSON);
saveFile
