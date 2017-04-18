
const fs = require('fs');
const contents = fs.readFileSync('sounderUsers.json');
const data = JSON.parse(contents);


exports.seed = function(knex, Promise) {
  const userData = data.map((user)=>{
    return {
    username: user.username,
    profilePictureURL: user.profilePicture,
    numFollowers: user.numFollowers,
    karma: user.karma,
    profileURL: user.profileURL,
    genre: user.genre,
    followerRange: user.followerRange,
    online: user.online
  };
});

  const matchData = data.map((user)=>{
    for (follower of user.followers) {
      return {
        id: user.id,
        follower: follower
      };
    };
  });

  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(userData);
    });
    .then(function () {
      // Inserts seed entries
      return knex('matches').insert(matchData);
    })
};
