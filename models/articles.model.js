const client = require("../db/connection");

exports.selectArticle = article_id => {
  return client
    .select("*")
    .from("articles")
    .where({ article_id })
    .then(articleArr => {
      if (articleArr.length === 0) {
        return Promise.reject({
          status: 404,
          message: "Article does not exist"
        });
      } else {
        const article = articleArr[0];
        return article;
      }
    })
    .then(article => {
      const { article_id } = article;
      return Promise.all([
        article,
        client("comments")
          .where({ article_id })
          .count()
          .then(result => {
            const count = Number.parseInt(result[0]["count"]);
            return count;
          })
      ]).then(([article, count]) => {
        article["comment_count"] = count;
        return { article };
      });
    });
};

exports.updateArticle = (article, inc_votes) => {
  // return article.increment(article["article"]["votes"], inc_votes);
  // is there a way of doing this with knex update/increment?
  if (typeof inc_votes === "number") {
    article["article"]["votes"] += inc_votes;
    return article;
  } else {
    return Promise.reject({ status: 400, message: "Invalid data input" });
  }
};

exports.insertComment = (username, body) => {};
