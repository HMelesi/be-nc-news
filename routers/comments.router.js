const commentsRouter = require("express").Router();
const { methodError } = require("../handling");
const {
  changeComment,
  removeComment
} = require("../controllers/comments.controller");

commentsRouter
  .route("/:comment_id")
  .patch(changeComment)
  .delete(removeComment)
  .all(methodError);

module.exports = commentsRouter;
