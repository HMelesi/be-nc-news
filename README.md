# Northcoders News API

## Background

Northcoders News API was created as an assessment project during the backend part of my time at **Northcoders**. The project assessed knowledge of building databases and seeding, creater a server and routing endpoints, and finally hosting the project.

The hosted version of this project can be found [here](https://hm-nc-news-app.herokuapp.com/api/)

## Getting Started

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
