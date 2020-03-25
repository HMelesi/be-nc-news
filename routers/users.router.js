const usersRouter = require("express").Router();
const { methodError } = require("../handling");
const {
  fetchUser,
  addUser,
  fetchAllUsers
} = require("../controllers/users.controller");

usersRouter
  .route("/:username")
  .get(fetchUser)
  .all(methodError);

usersRouter
  .route("/")
  .post(addUser)
  .get(fetchAllUsers)
  .all(methodError);

module.exports = usersRouter;
