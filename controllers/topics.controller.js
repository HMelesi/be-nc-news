const { selectTopics } = require("../models/topics.model");

exports.fetchAllTopics = (req, res, next) => {
  selectTopics()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
};

exports.methodError = (req, res, next) => {
  res.status(405).send({ message: "Invalid method on topics endpoint" });
};
