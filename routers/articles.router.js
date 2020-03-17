const articlesRouter = require("express").Router();
const {
  fetchArticle,
  changeArticle,
  addComment
} = require("../controllers/articles.controller");

articlesRouter.route("/:article_id/comments").post(addComment);

articlesRouter
  .route("/:article_id")
  .get(fetchArticle)
  .patch(changeArticle);

module.exports = articlesRouter;
