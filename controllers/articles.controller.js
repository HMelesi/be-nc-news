const {
  selectArticle,
  updateArticle,
  insertComment
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
  selectArticle(article_id)
    .then(article => {
      return updateArticle(article, inc_votes);
    })
    .then(response => {
      res.status(201).send(response);
    })
    .catch(next);
};

exports.addComment = (req, res, next) => {
  insertComment().then(comment => {
    res.status(201).send(comment);
  });
};
