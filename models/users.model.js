const client = require("../db/connection");

exports.selectUser = username => {
  return client
    .select("*")
    .from("users")
    .where({ username })
    .then(([user]) => {
      if (user === undefined) {
        return Promise.reject({
          status: 404,
          message: "Username does not exist"
        });
      } else {
        return { user };
      }
    });
};

exports.insertUser = body => {
  return client("users")
    .insert(body)
    .returning("*")
    .then(([user]) => {
      return { user };
    });
};

exports.selectAllUsers = () => {
  return client
    .select("*")
    .from("users")
    .then(users => {
      return { users };
    });
};
