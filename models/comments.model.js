const client = require("../db/connection");

exports.updateComment = (comment_id, inc_votes) => {
  return client
    .select("*")
    .from("comments")
    .where({ comment_id })
    .increment({ votes: inc_votes })
    .returning("*")
    .then(([comment]) => {
      if (comment === undefined) {
        return Promise.reject({
          status: 404,
          message: "Comment does not exist"
        });
      } else {
        return { comment };
      }
    });
};

exports.deleteComment = comment_id => {
  return client
    .select("*")
    .from("comments")
    .where({ comment_id })
    .then(result => {
      if (result.length === 0) {
        return Promise.reject({
          status: 404,
          message: "Comment does not exist"
        });
      } else {
        return client
          .del("*")
          .from("comments")
          .where({ comment_id });
      }
    });
};
