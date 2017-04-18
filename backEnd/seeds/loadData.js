
const fs = require('fs');
const contents = fs.readFileSync('sounderUsers.json');
const data = JSON.parse(contents);


exports.seed = function(knex, Promise) {
  const userData = data.map((user)=>{
    return {
    username: user.username,
    profilePicture: user.profilePicture,
    numFollowers: user.numFollowers,
    karma: user.karma,
    profileURL: user.profileURL,
    genre: user.genre,
    followerRange: user.followerRange,
    online: user.online
  };
});

  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(userData);
    });
};


exports.seed = function(knew, Promise) {
  const matchData = data.map((user)=>{
    for (follower of user.followers) {
      return {
        id: user.id,
        follower: follower
      }
    }
  });

  return knex('matches').del()
    .then(function () {
      // Inserts seed entries
      return knex('matches').insert(matchData);
    });
};

//table name refers to one singular table name
//returns a promise, way to specify asynchronous behavior that won't fire without .then
