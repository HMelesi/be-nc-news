exports.up = function(knex) {
  return knex.schema.createTable("users", usersTable => {
    usersTable
      .string("username")
      .notNullable()
      .primary()
      .unique();
    usersTable.text("avatar_url").notNullable();
    usersTable.string("name").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
