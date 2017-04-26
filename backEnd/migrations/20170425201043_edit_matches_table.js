exports.up = function(knex, Promise) {
  return knex.schema.table('matches', function(table) {
    table.renameColumn('user1_id', 'user_id')
    table.renameColumn('match', 'matched_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('matches', function(table) {
    table.renameColumn('user_id', 'user1_id')
    table.renameColumn('matched_id', 'match')
  })
};
