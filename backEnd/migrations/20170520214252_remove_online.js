exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(t) {
      t.dropColumn('online');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(t) {
      t.integer('online').notNull().defaultTo(0);
  });
};
