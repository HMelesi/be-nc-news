const usersRouter = require("express").Router();
const { fetchUsers, methodError } = require("../controllers/users.controller");

usersRouter
  .route("/:username")
  .get(fetchUsers)
  .all(methodError);

module.exports = usersRouter;
