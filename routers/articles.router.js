const articlesRouter = require("express").Router();
const { methodError } = require("../handling");
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
  .get(fetchComments)
  .all(methodError);

articlesRouter
  .route("/:article_id")
  .get(fetchArticle)
  .patch(changeArticle)
  .all(methodError);

articlesRouter
  .route("/")
  .get(fetchAllArticles)
  .all(methodError);

module.exports = articlesRouter;
