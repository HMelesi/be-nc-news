const articlesRouter = require("express").Router();
const {
  fetchArticle,
  changeArticle,
  addComment,
  fetchComments,
  fetchAllArticles
} = require("../controllers/articles.controller");

articlesRouter
  .route("/:article_id/comments")
  .post(addComment)
  .get(fetchComments);

articlesRouter
  .route("/:article_id")
  .get(fetchArticle)
  .patch(changeArticle);

articlesRouter.route("/").get(fetchAllArticles);

module.exports = articlesRouter;
