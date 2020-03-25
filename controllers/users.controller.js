const {
  selectUser,
  insertUser,
  selectAllUsers
} = require("../models/users.model");

exports.fetchUser = (req, res, next) => {
  const { username } = req.params;
  selectUser(username)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
};

exports.addUser = (req, res, next) => {
  const { body } = req;
  insertUser(body)
    .then(result => {
      res.status(201).send(result);
    })
    .catch(next);
};

exports.fetchAllUsers = (req, res, next) => {
  selectAllUsers().then(result => {
    res.status(200).send(result);
  });
};
