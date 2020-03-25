const topicsRouter = require("express").Router();
const { methodError } = require("../handling");
const {
  fetchAllTopics,
  addTopic
} = require("../controllers/topics.controller");

topicsRouter
  .route("/")
  .get(fetchAllTopics)
  .post(addTopic)
  .all(methodError);

module.exports = topicsRouter;
