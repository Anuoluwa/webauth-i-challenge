exports.up = function(knex) {
  return knex.schema
  .createTable("users", (table) => {
      table.increments();
      table.text("username", 100).notNullable();
      table.text("email").notNullable().unique();
      table.text("password").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
