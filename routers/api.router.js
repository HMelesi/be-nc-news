const apiRouter = require("express").Router();
const topicsRouter = require("./topics.router");
const usersRouter = require("./users.router");
const articlesRouter = require("./articles.router.js");
const commentsRouter = require("./comments.router");
const { methodError } = require("../handling");
const listEndpoints = require("express-list-endpoints");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter
  .route("/")
  .get((req, res, next) => {
    const endpoints = listEndpoints(apiRouter);
    res.status(200).send({ endpoints });
  })
  .all(methodError);

module.exports = apiRouter;
