const usersRouter = require("express").Router();
const { fetchUsers } = require("../controllers/users.controller");

usersRouter.route("/").get(fetchUsers);

module.exports = usersRouter;
