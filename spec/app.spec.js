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

  describe("/api/topics", () => {
    it("GET request returns an array of topic objects with the correct properties", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.topics).to.be.an("array");
          expect(response.body.topics[0]).to.have.keys(["description", "slug"]);
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
  });
  describe("/api/articles/:article_id", () => {
    it("GET request an article object, with required properties", () => {
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
          expect(response.body.article.comment_count).to.equal(2);
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
          expect(response.body.message).to.equal("Bad request");
        });
    });
    it("PATCH request to article_id increases the vote property and returns article object", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 30 })
        .expect(201)
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
          expect(response.body.article.votes).to.equal(130);
        });
    });
    it("PATCH request to article_id decreases the vote property and returns article object", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: -40 })
        .expect(201)
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
          expect(response.body.message).to.equal("Bad request");
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
          expect(response.body.message).to.equal("Invalid data input");
        });
    });
    it("ERROR: PATCH request to valid article_id with body missing inc_votes property returns 400 and error message", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ name: "mitch" })
        .expect(400)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.message).to.equal("Invalid data input");
        });
    });
    it("ERROR: PATCH request to valid article_id with body including changes to a votes as well as different property returns article with only votes changed", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 1, author: "mitch" })
        .expect(201)
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.article.votes).to.equal(101);
          expect(response.body.article.author).to.equal("butter_bridge");
        });
    });
  });
  describe("/api/articles/:article_id/comments", () => {
    it("POST request responds with status 204 and comment object", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "test-username", body: "test-body" })
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
          expect(response.body.comment.author).to.equal("test-username");
          expect(response.body.comment.body).to.equal("test-body");
          expect(response.body.comment.article_id).to.equal(1);
        });
    });
  });
});
