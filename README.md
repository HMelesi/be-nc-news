# Northcoders News API

## Background

Northcoders News API was created as an assessment project during the backend part of my time at **Northcoders**. The project assessed knowledge of building databases and seeding, creater a server and routing endpoints, and finally hosting the project.

The hosted version of this project can be found [here](https://hm-nc-news-app.herokuapp.com/api/)

The server has the following endpoints and methods:

**GET** /api

**GET** /api/topics

**GET** /api/users/:username

**GET** /api/articles

**GET** /api/articles/:article_id
**PATCH** /api/articles/:article_id

**POST** /api/articles/:article_id/comments
**GET** /api/articles/:article_id/comments

**PATCH** /api/comments/:comment_id
**DELETE** /api/comments/:comment_id

## Getting Started

To run this project you will need to install:

_[Node.js](https://nodejs.org/en/download/) - version 13.8.0 or higher
_[PostgreSQL](https://www.postgresql.org/download/) - version 7.18.2 or higher

To create your own copy of the project, please fork this repository and using your terminal, clone using the command:

```
git clone your-forked-repo-link-here
```

Once open, install dependencies run the following command in your terminal:

```
npm install
```

To seed database:

```
npm run seed
```

## Running tests

All tests in this repository use **mocha** and **chai**

### Testing server & endpoints

Tests for server and endpoint functionality are located at _/spec/app.spec.js_

To run these tests, use the following command in your terminal:

```
npm test
```

### Testing utility functions

Tests for utility functions used in seeding the database are located at _/spec/utils.spec.js_

To run these tests, use the following command in your terminal:

```
npm run test-utils
```
