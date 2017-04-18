/*This file allows us to create a JSON file that represents the Sounder database*/

/*This function creates the user object. A user object will store a username, a list of three songs,
a list of followers, a genre, a list of people you liked on Sounder, and a list of people who liked you on Sounder.*/
function user(username, songs, followers, genre, peopleYouLike, peopleWhoLikedYou, peopleYouveSeen) {
    this.username = username;
    this.songs = songs;
    this.followers = followers;
    this.genre = genre;
    this.peopleYouLike = peopleYouLike;
    this.peopleWhoLikedYou = peopleWhoLikedYou;
    this.peopleYouveSeen = peopleYouveSeen;

}
/*Here, we initialize our global variables*/
numberOfUsers = 50;
numberofSongs = 3;
followerRange = 20;
musicGenres = ["Blues", "Country", "Electronic", "Folk", "Hip hop", "Jazz", "Latin", "Pop", "R&B", "Rock"];
numberOfGenres = musicGenres.length;
sounderUsers = [];

/*Here, we create  our user objects and store them in the list sounderUsers. */
for(i = 1; i <numberOfUsers + 1; i++){
	username = "username" + i;
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
	/*For now, we will keep the list of peopleYouLike and peopleWhoLikeYou empty*/
	sounderUsers.push(new user(username, songs, followers, genre, [], [], []));
 }

/*Here, we make our sounderUsers list into a JSON file*/
var myJSON = JSON.stringify(sounderUsers);
console.log(myJSON);

