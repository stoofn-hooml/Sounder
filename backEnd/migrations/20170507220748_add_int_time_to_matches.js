
exports.up = function(knex, Promise) {
  return knex.schema.table('matches', function(t){
    t.integer('matchTimeInt').notNull().defaultTo(0);
};

exports.down = function(knex, Promise) {

};
