const client = require("../db/connection");

exports.selectArticle = article_id => {
  return client
    .select("articles.*")
    .from("articles")
    .where({ "articles.article_id": article_id })
    .count({ comment_count: "comments.article_id" })
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .then(([article]) => {
      if (article === undefined) {
        return Promise.reject({
          status: 404,
          message: "Article does not exist"
        });
      }
      return { article };
    });
};

exports.updateArticle = (article_id, inc_votes) => {
  return client
    .select("*")
    .from("articles")
    .where({ article_id })
    .increment({ votes: inc_votes })
    .returning("*")
    .then(([article]) => {
      if (article === undefined) {
        return Promise.reject({
          status: 404,
          message: "Article does not exist"
        });
      } else {
        return { article };
      }
    });
};

exports.insertComment = (article_id, author, body) => {
  return client("comments")
    .insert({ article_id, author, body })
    .returning("*")
    .then(([comment]) => {
      return { comment };
    });
};

exports.selectComments = (article_id, sort_by, order) => {
  return client
    .select("*")
    .from("comments")
    .where({ article_id })
    .modify(query => {
      if (sort_by !== undefined) {
        return query.orderBy(sort_by, order || "desc");
      } else {
        return query.orderBy("created_at", order || "desc");
      }
    })
    .then(commentsArr => {
      if (commentsArr.length === 0) {
        return Promise.reject({
          status: 404,
          message: "Article does not exist"
        });
      } else {
        const comments = commentsArr.map(comment => {
          delete comment.article_id;
          return comment;
        });
        return { comments };
      }
    });
};

exports.selectAllArticles = (sort_by, order, author, topic) => {
  const orders = ["asc", "desc", undefined];
  if (!orders.includes(order)) {
    return Promise.reject({ status: 400, message: "Invalid order request" });
  } else {
    return client
      .select("articles.*")
      .from("articles")
      .count({ comment_count: "comments.article_id" })
      .leftJoin("comments", "articles.article_id", "comments.article_id")
      .groupBy("articles.article_id")
      .modify(query => {
        if (sort_by !== undefined) {
          return query.orderBy(sort_by, order || "desc");
        } else {
          return query.orderBy("created_at", order || "desc");
        }
      })
      .modify(query => {
        if (author !== undefined) {
          return query.where("articles.author", author);
        }
      })
      .modify(query => {
        if (topic !== undefined) {
          return query.where("articles.topic", topic);
        }
      })
      .then(articlesWithBody => {
        if (articlesWithBody.length === 0) {
          return Promise.reject({
            status: 400,
            message: "No such articles exist"
          });
        } else {
          const articles = articlesWithBody.map(article => {
            delete article.body;
            return article;
          });

          return { articles };
        }
      });
  }
};
