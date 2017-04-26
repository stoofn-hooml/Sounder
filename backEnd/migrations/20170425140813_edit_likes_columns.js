exports.up = function(knex, Promise) {
  return knex.schema.table('likes', function(table) {
    table.renameColumn('user1_id', 'user_id')
    table.renameColumn('liked_user', 'liked_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('likes', function(table) {
    table.renameColumn('user_id', 'user1_id')
    table.renameColumn('liked_id', 'liked_user')
  })
};
