const { expect } = require("chai");
const {
  formatDates,
  makeRefObj,
  formatComments
} = require("../db/utils/utils");
const articlesArray = require("./articlestestutils");

describe("formatDates", () => {
  it("Given an array of objects returns a new array of new objects", () => {
    const input = articlesArray;
    const actual = formatDates(input);
    expect(actual).to.not.equal(input);
    expect(actual[0]).to.not.equal(input[0]);
  });
  it("Does not mutate input array or objects within array", () => {
    const input = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      },
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body:
          "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: 1416140514171
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171
      }
    ];
    const control = [
      {
        title: "Living in the shadow of a great man",
        topic: "mitch",
        author: "butter_bridge",
        body: "I find this existence challenging",
        created_at: 1542284514171,
        votes: 100
      },
      {
        title: "Sony Vaio; or, The Laptop",
        topic: "mitch",
        author: "icellusedkars",
        body:
          "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
        created_at: 1416140514171
      },
      {
        title: "Eight pug gifs that remind me of mitch",
        topic: "mitch",
        author: "icellusedkars",
        body: "some gifs",
        created_at: 1289996514171
      }
    ];
    expect(input).to.eql(control);
    expect(input[0]).to.eql(control[0]);
  });
  it("Objects in returned array have same keys as input array", () => {
    const input = articlesArray;
    const actual = formatDates(input);
    expect(actual[0]).to.have.keys([
      "title",
      "topic",
      "author",
      "body",
      "created_at",
      "votes"
    ]);
  });
  it("For each object in array, timestamp is converted into a Javascript date object", () => {
    const input = articlesArray;
    const actual = formatDates(input);
    expect(new Date(actual[0]["created_at"])).to.eql(actual[0]["created_at"]);
  });
  it("Object values which are not timestamp remain unchanged", () => {});
});

describe("makeRefObj", () => {
  it("When passed an array, does not mutate input array and objects in array, and returns object", () => {
    const input = [
      {
        article_id: 1,
        title: "test_title_a",
        body: "body-a",
        votes: 5,
        topic: "topic-a",
        author: "username-a",
        created_at: 1234
      },
      {
        article_id: 2,
        title: "test_title_b",
        body: "body-b",
        votes: 10,
        topic: "topic-b",
        author: "username-b",
        created_at: 2345
      },
      {
        article_id: 3,
        title: "test_title_c",
        body: "body-c",
        votes: 10,
        topic: "topic-c",
        author: "username-c",
        created_at: 2345
      }
    ];
    const control = [
      {
        article_id: 1,
        title: "test_title_a",
        body: "body-a",
        votes: 5,
        topic: "topic-a",
        author: "username-a",
        created_at: 1234
      },
      {
        article_id: 2,
        title: "test_title_b",
        body: "body-b",
        votes: 10,
        topic: "topic-b",
        author: "username-b",
        created_at: 2345
      },
      {
        article_id: 3,
        title: "test_title_c",
        body: "body-c",
        votes: 10,
        topic: "topic-c",
        author: "username-c",
        created_at: 2345
      }
    ];
    const actual = makeRefObj(input);
    expect(actual).to.be.an("object");
    expect(input).to.eql(control);
    expect(input[0]).to.eql(control[0]);
  });
  it("when passed an empty array, returns an empty object", () => {
    const input = [];
    expect(makeRefObj(input)).to.eql({});
  });
  it("When input an article array of length 1, returns reference object of array", () => {
    const input = [
      {
        article_id: 1,
        title: "test_title_a",
        body: "body-a",
        votes: 5,
        topic: "topic-a",
        author: "username-a",
        created_at: 1234
      }
    ];
    const actual = makeRefObj(input);
    const expected = { test_title_a: 1 };
    expect(actual).to.eql(expected);
  });
  it("When input an article array of length greater than 1, returns reference object of array", () => {
    const input = [
      {
        article_id: 1,
        title: "test_title_a",
        body: "body-a",
        votes: 5,
        topic: "topic-a",
        author: "username-a",
        created_at: 1234
      },
      {
        article_id: 2,
        title: "test_title_b",
        body: "body-b",
        votes: 10,
        topic: "topic-b",
        author: "username-b",
        created_at: 2345
      },
      {
        article_id: 3,
        title: "test_title_c",
        body: "body-c",
        votes: 10,
        topic: "topic-c",
        author: "username-c",
        created_at: 2345
      }
    ];
    const actual = makeRefObj(input);
    const expected = { test_title_a: 1, test_title_b: 2, test_title_c: 3 };
    expect(actual).to.eql(expected);
  });
});

describe("formatComments", () => {
  it("When passed an empty comments array, returns an empty array", () => {
    const input = [];
    expect(formatComments(input)).to.eql([]);
  });
  it("does not mutate input array or objects within array", () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389
      },
      {
        body:
          "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 100,
        created_at: 1448282163389
      }
    ];
    const control = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389
      },
      {
        body:
          "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "icellusedkars",
        votes: 100,
        created_at: 1448282163389
      }
    ];
    formatComments(input);
    expect(input).to.eql(control);
    expect(input[0]).to.eql(control[0]);
  });
  it("When passed an array of length 1 and reference object, returns array of object in correct format", () => {
    const refObj = {
      "this title": 1,
      "Living in the shadow of a great man": 3,
      "other title": 2
    };
    const input = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389
      }
    ];
    const expected = [
      {
        author: "butter_bridge",
        article_id: 3,
        votes: 14,
        created_at: new Date(1479818163389),
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky."
      }
    ];
    expect(formatComments(input, refObj)).to.eql(expected);
  });
  it("When passed an array of length greater than one, returns an array of objects in the correct format", () => {
    const refObj = {
      A: 15,
      "Living in the shadow of a great man": 3,
      "They're not exactly dogs, are they?": 23
    };
    const input = [
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389
      },
      {
        body: "This is a bad article name",
        belongs_to: "A",
        created_by: "butter_bridge",
        votes: 1,
        created_at: 1038314163389
      },
      {
        body: "The owls are not what they seem.",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "icellusedkars",
        votes: 20,
        created_at: 1006778163389
      }
    ];
    const expected = [
      {
        author: "butter_bridge",
        article_id: 3,
        votes: 14,
        created_at: new Date(1479818163389),
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky."
      },
      {
        author: "butter_bridge",
        article_id: 15,
        votes: 1,
        created_at: new Date(1038314163389),
        body: "This is a bad article name"
      },
      {
        author: "icellusedkars",
        article_id: 23,
        votes: 20,
        created_at: new Date(1006778163389),
        body: "The owls are not what they seem."
      }
    ];
    expect(formatComments(input, refObj)).to.eql(expected);
  });
});
