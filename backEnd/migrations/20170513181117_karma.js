exports.up = function(knex, Promise) {
  return knex.schema.table('matches', function(t) {
      t.integer('user_id_rating').notNull().defaultTo(0);
      t.integer('matched_id_rating').notNull().defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(t) {
      t.dropColumn('user_id_rating');
      t.dropColumn('matched_id_rating');
  });
};
