const commentsRouter = require("express").Router();
const { changeComment } = require("../controllers/comments.controller");

commentsRouter.route("/:comment_id").patch(changeComment);

module.exports = commentsRouter;
