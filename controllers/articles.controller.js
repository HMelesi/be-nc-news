const {
  selectArticle,
  updateArticle,
  insertComment,
  selectComments,
  selectAllArticles,
  insertArticle,
  deleteArticle
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
      res.status(200).send(response);
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
  const { sort_by, order, limit, p } = req.query;
  selectComments(article_id, sort_by, order, limit, p)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
};

exports.fetchAllArticles = (req, res, next) => {
  const { sort_by, order, author, topic, limit, p } = req.query;
  selectAllArticles(sort_by, order, author, topic, limit, p)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(next);
};

exports.addArticle = (req, res, next) => {
  const { body } = req;
  insertArticle(body)
    .then(result => {
      res.status(201).send(result);
    })
    .catch(next);
};

exports.removeArticle = (req, res, next) => {
  const { article_id } = req.params;
  deleteArticle(article_id)
    .then(result => {
      res.status(204).send();
    })
    .catch(next);
};
