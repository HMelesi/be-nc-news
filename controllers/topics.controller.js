const { selectTopics } = require("../models/topics.model");

exports.fetchAllTopics = (req, res, next) => {
  selectTopics()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
};
