
const fs = require('fs');
const contents = fs.readFileSync('sounderUsers.json');
const data = JSON.parse(contents);


exports.seed = function(knex, Promise) {
  const userData = data.map((user)=>{
    return {
    id: user.id,
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

const followerData = [];
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].followers.length; j++){
      followerData.push( {
        user1_id: data[i].id,
        follower: data[i].followers[j]
      })
    }
  }

  return Promise.all([
    knex('users').del(),
    knex('followers').del(),
  ])
  .then(()=>{
    return Promise.all([
      knex('users').insert(userData),
      knex('followers').insert(followerData),
    ])
  })
};
