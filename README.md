# Northcoders News API

## Background

Northcoders News API was created as an assessment project during the backend part of my time at **Northcoders**. The project assessed knowledge of building databases and seeding, creater a server and routing endpoints, and finally hosting the project.

The hosted version of this project can be found [here](https://hm-nc-news-app.herokuapp.com/api/)

The server has the following endpoints and methods:

**GET** /api

**GET** /api/topics

returns object in the following format:

```
{
   "topics": [
      {
         "slug": "coding",
         "description": "Code is love, code is life"
      },
      {
         "slug": "football",
         "description": "FOOTIE!"
      },
      {
         "slug": "cooking",
         "description": "Hey good looking, what you got cooking?"
      }
   ]
}
```

**GET** /api/users/

returns object in the following format:

```
{
   "users": [
      {
         "username": "tickle122",
         "avatar_url": "https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg",
         "name": "Tom Tickle"
      },
      {
         "username": "grumpy19",
         "avatar_url": "https://www.tumbit.com/profile-image/4/original/mr-grumpy.jpg",
         "name": "Paul Grump"
      },
      {
         "username": "happyamy2016",
         "avatar_url": "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729",
         "name": "Amy Happy"
      },
      ...
   ]
}
```

**GET** /api/users/:username

returns object in the following format:

```
{
   "user": {
      "username": "jessjelly",
      "avatar_url": "https://s-media-cache-ak0.pinimg.com/564x/39/62/ec/3962eca164e60cf46f979c1f57d4078b.jpg",
      "name": "Jess Jelly"
   }
}
```

**GET** /api/articles

returns object in the following format:

```
{
   "articles": [
      {
         "article_id": 33,
         "title": "Seafood substitutions are increasing",
         "votes": 0,
         "topic": "cooking",
         "author": "weegembump",
         "created_at": "2018-05-30T15:59:13.341Z",
         "comment_count": "6"
      },
      {
         "article_id": 28,
         "title": "High Altitude Cooking",
         "votes": 0,
         "topic": "cooking",
         "author": "happyamy2016",
         "created_at": "2018-05-27T03:32:28.514Z",
         "comment_count": "5"
      },
      {
         "article_id": 30,
         "title": "Twice-Baked Butternut Squash Is the Thanksgiving Side Dish of Your Dreams",
         "votes": 0,
         "topic": "cooking",
         "author": "jessjelly",
         "created_at": "2018-05-06T02:40:35.489Z",
         "comment_count": "8"
      },
      ...
   ]
}
```

**GET** /api/articles/:article_id

returns object in the following format:

```
{
   "article": {
      "article_id": 33,
      "title": "Seafood substitutions are increasing",
      "body": "'SEAFOOD fraud is a serious global problem', begins a recent report from Oceana, an NGO. Reviewing over 200 studies in 55 countries, the report finds that one in five fish sold has been mislabelled. Although fish fraud is common early in the supply chain, most of it comes at the retail level. In 65% of cases, the motivation is economic—slippery restaurateurs frequently serve up cheaper fish than they advertise to cut costs. In America, Oceana has reported instances of tilapia being sold as the more expensive red snapper. Especially brazen fish criminals have invented new types of fish entirely. In Brazil, researchers were puzzled to find markets selling 'douradinha', ' non-existent species. Close inspection found that 60% of such fish were actually 'vulture' catfish, a relatively undesirable dish. Reports in America of catfish being substituted for more expensive fish date back to at least 2002; Oceana’s study suggests that the phenomenon is spreading.",
      "votes": 0,
      "topic": "cooking",
      "author": "weegembump",
      "created_at": "2018-05-30T15:59:13.341Z",
      "comment_count": "6"
   }
}
```

**PATCH** /api/articles/:article_id

**POST** /api/articles/:article_id/comments

**GET** /api/articles/:article_id/comments

returns object in the following format:

```
{
   "comments": [
      {
         "comment_id": 115,
         "author": "happyamy2016",
         "votes": 12,
         "created_at": "2018-01-19T14:47:14.514Z",
         "body": "Neque dolor sint illum id consequuntur debitis qui nam eum. Nam adipisci similique consequatur officiis. Totam qui enim at iste dolorem ullam. Tenetur laudantium sed facilis aspernatur occaecati. Provident rerum quia consectetur et. Molestiae eligendi commodi."
      },
      {
         "comment_id": 272,
         "author": "tickle122",
         "votes": 17,
         "created_at": "2017-09-26T21:34:42.072Z",
         "body": "Distinctio excepturi laboriosam eos aperiam quis amet eum animi minima. Officiis in quia. Est consequatur optio atque nostrum iusto impedit harum quod asperiores."
      },
      {
         "comment_id": 196,
         "author": "cooljmessy",
         "votes": 0,
         "created_at": "2017-07-15T21:11:34.498Z",
         "body": "Qui consequuntur id beatae ut vel a error. Vitae et et. Mollitia soluta neque quibusdam tempore quis quia eos autem magni. Voluptatibus numquam nostrum et enim officiis rerum. Optio quo harum dolore voluptatem sit temporibus rem voluptas rem."
      },
     ...
   ]
}
```

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
