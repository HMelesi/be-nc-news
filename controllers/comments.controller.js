const { updateComment } = require("../models/comments.model");

exports.changeComment = (req, res, next) => {
  const { inc_votes } = req.body;
  const { comment_id } = req.params;
  updateComment(comment_id, inc_votes)
    .then(result => {
      res.status(201).send(result);
    })
    .catch(next);
};
