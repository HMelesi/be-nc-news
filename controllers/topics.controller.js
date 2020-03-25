const { selectTopics, insertTopic } = require("../models/topics.model");

exports.fetchAllTopics = (req, res, next) => {
  selectTopics()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
};

exports.addTopic = (req, res, next) => {
  const { body } = req;
  insertTopic(body)
    .then(result => {
      res.status(201).send(result);
    })
    .catch(next);
};
