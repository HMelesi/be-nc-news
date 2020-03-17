const usersRouter = require("express").Router();
const { fetchUsers } = require("../controllers/users.controller");

usersRouter.route("/:username").get(fetchUsers);

module.exports = usersRouter;
