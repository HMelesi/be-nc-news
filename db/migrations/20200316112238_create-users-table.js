exports.up = function(knex) {
  console.log("creating users table");
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
  console.log("removing users table");
  return knex.schema.dropTable("users");
};
