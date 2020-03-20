const topicsRouter = require("express").Router();
const { methodError } = require("../handling");
const { fetchAllTopics } = require("../controllers/topics.controller");

topicsRouter
  .route("/")
  .get(fetchAllTopics)
  .all(methodError);

module.exports = topicsRouter;
