const usersTable = function(table){
  table.integer('id').primary();
  table.string('username');
  table.integer('numFollowers');
  table.string('profilePictureURL');
  table.integer('karma');
  table.string('profileURL');
  table.string('genre');
  table.integer('followerRange');
  table.integer('online');
  table.string('song1');
  table.string('song2');
  table.string('song3');
}

const followerTable = function(table){
  table.integer('user1_id');
  table.integer('follower');
}



//.blob is an image or binary file, need to look into how to store arrays, string version and parse?
//nahhh store in different tables, set up tables for blobs

exports.up = function(knex, Promise) {
  return Promise.all(
  [knex.schema.createTable('users', usersTable),
  knex.schema.createTable('matches', followerTable)])
  .then(()=>{
    console.log("Database created");
  });

};

exports.down = function(knex, Promise) {
  return Promise.all(
  [knex.schema.dropTable('users', usersTable),
  knex.schema.dropTable('matches', followerTable)])
  .then(()=>{
    console.log("Database rekt");
  });

};
