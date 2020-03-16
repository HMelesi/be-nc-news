const client = require("../db/connection");

exports.selectTopics = () => {
  return client
    .select("*")
    .from("topics")
    .then(topics => {
      return { topics };
    });
};
