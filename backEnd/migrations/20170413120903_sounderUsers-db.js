const usersTable = function(table){
  table.increments('id').primary();
  table.string('username');
  table.integer('numFollowers');
  table.string('profilePictureURL');
  table.integer('karma');
  table.string('profileURL')
  table.string('genre')
  table.integer('followerRange')
  table.integer('online')
}

const matchTable = function(table){
  table.integer('user1_id');
  table.integer('user2_id');
}



//.blob is an image or binary file, need to look into how to store arrays, string version and parse?
//nahhh store in different tables, set up tables for blobs

exports.up = function(knex, Promise) {
  return Promise.all(
  [knex.schema.createTable('users', usersTable),
  knex.schema.createTable('matches', matchTable)])
  .then(()=>{
    console.log("Database created");
  });

};

exports.down = function(knex, Promise) {
  return Promise.all(
  [knex.schema.dropTable('users', usersTable),
  knex.schema.dropTable('matches', matchTable)])
  .then(()=>{
    console.log("Database rekt");
  });

};
