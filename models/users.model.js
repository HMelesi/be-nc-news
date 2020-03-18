const client = require("../db/connection");

exports.selectUsers = username => {
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
