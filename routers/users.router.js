const usersRouter = require("express").Router();
const { methodError } = require("../handling");
const { fetchUsers } = require("../controllers/users.controller");

usersRouter
  .route("/:username")
  .get(fetchUsers)
  .all(methodError);

module.exports = usersRouter;
