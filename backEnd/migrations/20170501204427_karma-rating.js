
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(t){
    t.integer('thumbsUpTotal').notNull().defaultTo(0);
    t.integer('totalRatings').notNull().defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users',function(t){
    t.dropColumn('thumbsUpTotal');
    t.dropColumn('totalRatings');
  });
};
