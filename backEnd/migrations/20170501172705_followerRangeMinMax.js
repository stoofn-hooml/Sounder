
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(t){
    t.dropColumn('followerRange');
    t.integer('followerRangeMin').notNull().defaultTo(0);
    t.integer('followerRangeMax').notNull().defaultTo(1000000);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(t){
    t.dropColumn('followerRangeMin');
    t.dropColumn('followerRangeMax');
  });
};
