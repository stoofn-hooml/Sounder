const matchTable = function(table){
  table.integer('user1_id');
  table.integer('match');
}


exports.up = function(knex, Promise) {
  return knex.schema.renameTable('matches', 'followers')
  .then(()=>{
    return knex.schema.createTable('matches', matchTable)
  })
  .then(()=>{
    console.log("Matches created")
  })
};

exports.down = function(knex, Promise) {
  return Promise.all(
    knex.schema.renameTable('followers', 'matches'),
    knex.schema.dropTable('matches'))
  .then(()=>{
    console.log("Dropped")
  })
};
