
const fs = require('fs');
const contents = fs.readFileSync('sounderUsers.json');
const data = JSON.parse(contents);


exports.seed = function(knex, Promise) {
  const records = data.map((record)=>{
    return {
    username: record.username,
    profilePicture: record.profilePicture,
    numFollowers: record.numFollowers,
    karma: record.karma,
    profileURL: record.profileURL,
    genre: record.genre,
    followerRange: record.followerRange,
    online: record.online
  };
});


  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(records);
    });
};

//table name refers to one singular table name
//returns a promise, way to specify asynchronous behavior that won't fire without .then
