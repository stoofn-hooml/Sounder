exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(t) {
      t.dropColumn('karma');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(t) {
      t.integer('karma').notNull().defaultTo(0);
  });
};
