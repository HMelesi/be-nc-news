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
  });
});
