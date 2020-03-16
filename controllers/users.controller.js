const { selectUsers } = require("../models/users.model");

exports.fetchUsers = (req, res, next) => {
  console.log("in the controller!!");
  const { username } = req.params;
  selectUsers(username);
};
