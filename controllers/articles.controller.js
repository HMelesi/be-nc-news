const {
  selectArticle,
  updateArticle,
  insertComment,
  selectComments,
  selectAllArticles
} = require("../models/articles.model");

exports.fetchArticle = (req, res, next) => {
  const { article_id } = req.params;
  selectArticle(article_id)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(next);
};

exports.changeArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticle(article_id, inc_votes)
    .then(response => {
      res.status(201).send(response);
    })
    .catch(next);
};

exports.addComment = (req, res, next) => {
  const { username, body } = req.body;
  const { article_id } = req.params;
  insertComment(article_id, username, body)
    .then(comment => {
      res.status(201).send(comment);
    })
    .catch(next);
};

exports.fetchComments = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;
  selectComments(article_id, sort_by, order)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
};

exports.fetchAllArticles = (req, res, next) => {
  const { sort_by, order, username, topic } = req.query;
  selectAllArticles(sort_by, order, username, topic)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
};

exports.methodError = (req, res, next) => {
  res.status(405).send({ message: "Invalid method on articles endpoint" });
};
