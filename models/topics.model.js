const client = require("../db/connection");

exports.selectTopics = () => {
  return client
    .select("*")
    .from("topics")
    .then(topics => {
      return { topics };
    });
};

exports.insertTopic = body => {
  return client("topics")
    .insert(body)
    .returning("*")
    .then(([topic]) => {
      return { topic };
    });
};
