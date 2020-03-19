const commentsRouter = require("express").Router();
const {
  changeComment,
  removeComment,
  methodError
} = require("../controllers/comments.controller");

commentsRouter
  .route("/:comment_id")
  .patch(changeComment)
  .delete(removeComment)
  .all(methodError);

module.exports = commentsRouter;
