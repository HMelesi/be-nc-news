const topicsRouter = require("express").Router();
const { fetchAllTopics } = require("../controllers/topics.controller");

topicsRouter.route("/").get(fetchAllTopics);

module.exports = topicsRouter;
