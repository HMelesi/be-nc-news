process.env.NODE_ENV = "test";
const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const client = require("../db/connection");

describe("/api", () => {
  beforeEach(() => {
    return client.seed.run();
  });

  after(() => {
    return client.destroy();
  });
  describe("/api", () => {
    it("GET request responds with JSON describing all the available endpoints on API", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.endpoints).to.be.an("array");
          expect(response.body.endpoints[0]).to.have.keys(["path", "methods"]);
        });
    });
    it("ERROR: request to /api with invalid method returns 405 and error message", () => {
      return request(app)
        .delete("/api")
        .expect(405)
        .then(response => {
          expect(response.body.message).to.equal("Invalid method on endpoint");
        });
    });
  });
  describe("/api/topics", () => {
    it("GET request returns an array of topic objects with the correct properties", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.topics).to.be.an("array");
          expect(response.body.topics[0]).to.have.keys(["description", "slug"]);
          expect(response.body.topics.length).to.equal(3);
        });
    });
    it("ERROR: request to topics with invalid method returns 405 and error message", () => {
      return request(app)
        .post("/api/topics")
        .send({ test: "test-a" })
        .expect(405)
        .then(response => {
          expect(response.body.message).to.equal("Invalid method on endpoint");
        });
    });
  });
  describe("/api/users/:username", () => {
    it("GET request returns a user object from username", () => {
      return request(app)
        .get("/api/users/rogersop")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.user).to.eql({
            username: "rogersop",
            name: "paul",
            avatar_url:
              "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4"
          });
        });
    });
    it("GET request returns a user object from username", () => {
      return request(app)
        .get("/api/users/rogersop")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.user).to.eql({
            username: "rogersop",
            name: "paul",
            avatar_url:
              "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4"
          });
        });
    });
    it("ERROR: GET request with username that doesn't exist", () => {
      return request(app)
        .get("/api/users/not_a_username")
        .expect(404)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.message).to.eql("Username does not exist");
        });
    });
    it("ERROR: request to users/:username with invalid method returns 405 and error message", () => {
      return request(app)
        .post("/api/users/butter_bridge")
        .send({ test: "test-a" })
        .expect(405)
        .then(response => {
          expect(response.body.message).to.equal("Invalid method on endpoint");
        });
    });
  });
  describe("/api/articles/:article_id", () => {
    it("GET request responds with an article object, with required properties", () => {
      return request(app)
        .get("/api/articles/9")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.article).to.have.keys([
            "author",
            "title",
            "article_id",
            "body",
            "topic",
            "created_at",
            "votes",
            "comment_count"
          ]);
          expect(response.body.article.comment_count).to.equal("2");
        });
    });
    it("ERROR: GET request to unfound article id returns 404 error and message", () => {
      return request(app)
        .get("/api/articles/0")
        .expect(404)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.message).to.equal("Article does not exist");
        });
    });
    it("ERROR: GET request to invalid article id returns 400 error and bad request message", () => {
      return request(app)
        .get("/api/articles/nan")
        .expect(400)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.message).to.equal("Invalid id or data input");
        });
    });
    it("PATCH request to article_id increases the vote property and returns article object", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 30 })
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.article).to.have.keys([
            "author",
            "title",
            "article_id",
            "body",
            "topic",
            "created_at",
            "votes"
          ]);
          expect(response.body.article.votes).to.equal(130);
        });
    });
    it("PATCH request to article_id decreases the vote property and returns article object", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: -40 })
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.article).to.have.keys([
            "author",
            "title",
            "article_id",
            "body",
            "topic",
            "created_at",
            "votes"
          ]);
          expect(response.body.article.votes).to.equal(60);
        });
    });
    it("ERROR: PATCH request to invalid article_id with valid body returns 400 and bad request", () => {
      return request(app)
        .patch("/api/articles/nan")
        .send({ inc_votes: -40 })
        .expect(400)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.message).to.equal("Invalid id or data input");
        });
    });
    it("ERROR: PATCH request to valid but non-existent article_id with valid body returns 404 and message", () => {
      return request(app)
        .patch("/api/articles/0")
        .send({ inc_votes: -40 })
        .expect(404)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.message).to.equal("Article does not exist");
        });
    });
    it("ERROR: PATCH request to valid article_id with invalid body returns 400 and error message", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: "not a number" })
        .expect(400)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.message).to.equal("Invalid id or data input");
        });
    });
    it("ERROR: PATCH request to valid article_id with body missing inc_votes property returns 400 and error message", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ name: "mitch" })
        .expect(400)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.message).to.equal("Invalid id or data input");
        });
    });
    it("ERROR: PATCH request to valid article_id with body including changes to a votes as well as different property returns article with only votes changed", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 1, author: "mitch" })
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.article.votes).to.equal(101);
          expect(response.body.article.author).to.equal("butter_bridge");
        });
    });
    it("ERROR: request to articles/:article_id with invalid method returns 405 and error message", () => {
      return request(app)
        .post("/api/articles/1")
        .send({ test: "test-a" })
        .expect(405)
        .then(response => {
          expect(response.body.message).to.equal("Invalid method on endpoint");
        });
    });
    it("DELETE request on article_id deletes the required article and all the articles comments", () => {
      return request(app)
        .delete("/api/articles/1")
        .expect(204)
        .then(response => {
          expect(response.body).to.eql({});
        });
    });
    it("ERROR: DELETE request on valid but non-existent article_id returns 404 and error message", () => {
      return request(app)
        .delete("/api/articles/0")
        .expect(404)
        .then(response => {
          expect(response.body.message).to.eql("Article does not exist");
        });
    });
    it("ERROR: DELETE request on invalid article_id returns 400 and error message", () => {
      return request(app)
        .delete("/api/articles/not_a_number")
        .expect(400)
        .then(response => {
          expect(response.body.message).to.eql("Invalid id or data input");
        });
    });
  });
  describe("/api/articles/:article_id/comments", () => {
    it("POST request responds with status 204 and comment object", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "butter_bridge", body: "test-body" })
        .expect(201)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.comment).to.have.keys([
            "comment_id",
            "author",
            "article_id",
            "votes",
            "created_at",
            "body"
          ]);
          expect(response.body.comment.votes).to.equal(0);
          expect(response.body.comment.author).to.equal("butter_bridge");
          expect(response.body.comment.body).to.equal("test-body");
          expect(response.body.comment.article_id).to.equal(1);
        });
    });
    it("ERROR: POST request with body missing properties username & body responds with status 400 and bad request", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({})
        .expect(400)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.message).to.equal(
            "Required input data not found"
          );
        });
    });
    it("ERROR: POST request to valid but non existent article_id responds with status 404 and error message", () => {
      return request(app)
        .post("/api/articles/0/comments")
        .send({ username: "butter_bridge", body: "test-body" })
        .expect(404)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.message).to.equal("Article does not exist");
        });
    });
    it("ERROR: POST request to invalid article_id responds with status 400 and error message", () => {
      return request(app)
        .post("/api/articles/nan/comments")
        .send({ username: "butter_bridge", body: "test-body" })
        .expect(400)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.message).to.equal("Invalid id or data input");
        });
    });
    it("GET request responds with 200 and an array of comments for the given article_id", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.comments).to.be.an("array");
          expect(response.body.comments.length).to.equal(10);
          expect(response.body.comments[0]).to.have.keys([
            "comment_id",
            "votes",
            "created_at",
            "author",
            "body"
          ]);
          expect(response.body.comments[0].comment_id).to.eql(2);
        });
    });
    it("GET request accepts limit and p queries, and responds with 200 and an array of comments for the given article_id", () => {
      return request(app)
        .get("/api/articles/1/comments?limit=5&p=2")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.comments).to.be.an("array");
          expect(response.body.comments.length).to.equal(5);
          expect(response.body.comments[0]).to.have.keys([
            "comment_id",
            "votes",
            "created_at",
            "author",
            "body"
          ]);
          expect(response.body.comments[0].comment_id).to.eql(7);
        });
    });
    it("ERROR: GET request to article_id with no comments returns 200 and empty array", () => {
      return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.comments).to.eql([]);
        });
    });
    it("ERROR: GET request with valid but non-existent article_id responds with 404 and error message", () => {
      return request(app)
        .get("/api/articles/0/comments")
        .expect(404)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.message).to.equal("Article does not exist");
        });
    });
    it("ERROR: GET request with invalid but non-existent article_id responds with 400 and error message", () => {
      return request(app)
        .get("/api/articles/nan/comments")
        .expect(400)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.message).to.equal("Invalid id or data input");
        });
    });
    it("GET request returns comments array sorted by column in chosen order", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=comment_id&order=asc")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.comments).to.be.an("array");
          expect(response.body.comments[0].comment_id).to.eql(2);
        });
    });
    it("ERROR: PATCH request to articles/:article_id/comments with invalid method returns 405 and error message", () => {
      return request(app)
        .patch("/api/articles/1/comments")
        .send({ test: "test-a" })
        .expect(405)
        .then(response => {
          expect(response.body.message).to.equal("Invalid method on endpoint");
        });
    });
  });
  describe("api/articles", () => {
    it("GET request responds with an array of all article objects, each with required properties", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.articles).to.be.an("array");
          expect(response.body.articles.length).to.equal(10);
          expect(response.body.articles[0]).to.have.keys([
            "author",
            "title",
            "article_id",
            "topic",
            "created_at",
            "votes",
            "comment_count"
          ]);
        });
    });
    it("GET request accepts limit query which limits the results shown, default to 10", () => {
      return request(app)
        .get("/api/articles?limit=5")
        .expect(200)
        .then(response => {
          expect(response.body.articles.length).to.equal(5);
        });
    });
    it("GET request accepts page query which specifies the page at which to start (calculated using limit), default to 1", () => {
      return request(app)
        .get("/api/articles?limit=5&p=2")
        .expect(200)
        .then(response => {
          expect(response.body.articles.length).to.equal(5);
          expect(response.body.articles[0].article_id).to.equal(6);
        });
    });
    it("GET request accepts sort_by query which uses column name to sort array and order which defaults to descending", () => {
      return request(app)
        .get("/api/articles?sort_by=votes")
        .expect(200)
        .then(response => {
          expect(response.body.articles[0]).to.eql({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            comment_count: "13",
            created_at: "2018-11-15T12:21:54.171Z",
            votes: 100
          });
        });
    });
    it("GET request accepts sort_by query which defaults to create_at to sort array", () => {
      return request(app)
        .get("/api/articles?order=asc")
        .expect(200)
        .then(response => {
          expect(response.body.articles[0]).to.eql({
            article_id: 12,
            author: "butter_bridge",
            comment_count: "0",
            created_at: "1974-11-26T12:21:54.171Z",
            title: "Moustache",
            topic: "mitch",
            votes: 0
          });
        });
    });
    it("ERROR: GET request when passed invalid column name returns 400 and error message", () => {
      return request(app)
        .get("/api/articles?sort_by=not_a_column")
        .expect(400)
        .then(response => {
          expect(response.body.message).to.equal(
            "Article property does not exist"
          );
        });
    });
    it("ERROR: GET request when passed a valid column name but invalid order returns 400 and error message", () => {
      return request(app)
        .get("/api/articles?sort_by=votes&order=not_order")
        .expect(400)
        .then(response => {
          expect(response.body.message).to.equal("Invalid order request");
        });
    });
    it("GET request accepts username parameter, which filters the articles by the username value specified in the query", () => {
      return request(app)
        .get("/api/articles?author=butter_bridge")
        .expect(200)
        .then(response => {
          expect(response.body.articles.length).to.equal(3);
          expect(response.body.articles[0].author).to.equal("butter_bridge");
        });
    });
    it("GET request accepts topic parameter, which filters the articles by the topic value specified in the query", () => {
      return request(app)
        .get("/api/articles?topic=cats")
        .expect(200)
        .then(response => {
          expect(response.body.articles.length).to.equal(1);
          expect(response.body.articles[0].topic).to.equal("cats");
        });
    });
    it("ERROR: GET request when passed topic parameter not in the database, returns 400 and error message", () => {
      return request(app)
        .get("/api/articles?topic=not_a_topic")
        .expect(404)
        .then(response => {
          expect(response.body.message).to.equal(
            "Topic or author does not exist"
          );
        });
    });
    it("ERROR: GET request when passed username parameter not in the database, returns 400 and error message", () => {
      return request(app)
        .get("/api/articles?author=not_a_username")
        .expect(404)
        .then(response => {
          expect(response.body.message).to.equal(
            "Topic or author does not exist"
          );
        });
    });
    it("ERROR: GET request when passed topic parameter in the database with no articles, returns 200 and empty array", () => {
      return request(app)
        .get("/api/articles?topic=paper")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.articles).to.eql([]);
        });
    });
    it("ERROR: GET request when passed author parameter in the database with no articles, returns 400 and error message", () => {
      return request(app)
        .get("/api/articles?author=lurker")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.articles).to.eql([]);
        });
    });
    it("ERROR: request to articles with invalid method returns 405 and error message", () => {
      return request(app)
        .patch("/api/articles")
        .send({ test: "test-a" })
        .expect(405)
        .then(response => {
          expect(response.body.message).to.equal("Invalid method on endpoint");
        });
    });
    it("POST request to articles returns 201 and created article object", () => {
      return request(app)
        .post("/api/articles")
        .send({
          title: "test-title",
          body: "test-body",
          topic: "paper",
          author: "butter_bridge"
        })
        .expect(201)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.article.article_id).to.equal(13);
          expect(response.body.article.votes).to.equal(0);
          expect(response.body.article).to.have.keys([
            "title",
            "body",
            "topic",
            "author",
            "created_at",
            "article_id",
            "votes"
          ]);
        });
    });
    it("ERROR: POST request with body missing values to articles returns 400 and error message", () => {
      return request(app)
        .post("/api/articles")
        .send({
          title: "test-title",
          body: "test-body",
          author: "butter_bridge"
        })
        .expect(400)
        .then(response => {
          expect(response.body.message).to.equal(
            "Required input data not found"
          );
        });
    });
    it("ERROR: POST request with body with non-existent author or topic to articles returns 400 and error message", () => {
      return request(app)
        .post("/api/articles")
        .send({
          title: "test-title",
          body: "test-body",
          author: "butter_bridge",
          topic: "not_a_topic"
        })
        .expect(400)
        .then(response => {
          expect(response.body.message).to.equal(
            "Article, author or topic does not exist"
          );
        });
    });
  });
  describe("/api/comments", () => {
    it("PATCH request updates votes on comment and returns the updated comment", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: 30 })
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.comment).to.be.an("object");
          expect(response.body.comment).to.have.keys([
            "comment_id",
            "author",
            "article_id",
            "votes",
            "created_at",
            "body"
          ]);
          expect(response.body.comment.votes).to.equal(46);
        });
    });
    it("ERROR: PATCH request to valid but non-existent comment, returns 404 and error message", () => {
      return request(app)
        .patch("/api/comments/0")
        .send({ inc_votes: 30 })
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.message).to.equal("Comment does not exist");
        });
    });
    it("ERROR: PATCH request to invalid comment, returns 404 and error message", () => {
      return request(app)
        .patch("/api/comments/nan")
        .send({ inc_votes: 30 })
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.message).to.equal("Invalid id or data input");
        });
    });
    it("ERROR: PATCH request to a valid comment with invalid body, returns 400 and error message", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({})
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.message).to.equal("Invalid id or data input");
        });
    });
    it("DELETE request with comment id deletes the comment and responds with 204", () => {
      return request(app)
        .del("/api/comments/1")
        .expect(204)
        .then(response => {
          expect(response.body).to.eql({});
        });
    });
    it("ERROR: DELETE request with invalid comment id returns 400 and error message", () => {
      return request(app)
        .del("/api/comments/not_a_number")
        .expect(400)
        .then(response => {
          expect(response.body.message).to.eql("Invalid id or data input");
        });
    });
    it("ERROR: DELETE request with valid but non-existent comment id returns 404 and error message", () => {
      return request(app)
        .del("/api/comments/0")
        .expect(404)
        .then(response => {
          expect(response.body.message).to.eql("Comment does not exist");
        });
    });
    it("ERROR: request to comments with invalid method returns 405 and error message", () => {
      return request(app)
        .get("/api/comments/1")
        .expect(405)
        .then(response => {
          expect(response.body.message).to.equal("Invalid method on endpoint");
        });
    });
  });
});
