
exports.up = function(knex, Promise) {
  return knex.schema.table('matches', function(t){
    t.string('matchTime').notNull().defaultTo(0);

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('matches',function(t){
    t.dropColumn('matchTime');
  });

};
