const topicsRouter = require("express").Router();
const {
  fetchAllTopics,
  methodError
} = require("../controllers/topics.controller");

topicsRouter
  .route("/")
  .get(fetchAllTopics)
  .all(methodError);

module.exports = topicsRouter;
