const { selectUsers } = require("../models/users.model");

exports.fetchUsers = (req, res, next) => {
  const { username } = req.params;
  selectUsers(username)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
};
