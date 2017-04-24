const likeTable = function(table){
  table.integer('user1_id');
  table.integer('liked_user');
}
exports.up = function(knex, Promise) {
  return knex.schema.createTable('likes', likeTable)
  .then(()=>{
    console.log("Likes created")
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('matches')
  .then(()=>{
    console.log("Dropped")
  })
};
