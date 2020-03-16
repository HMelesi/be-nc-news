const ENV = process.env.NODE_ENV || "development";

const test = require("./test-data/index-test");
const development = require("./development-data/index-dev");

const dataType = { test, development };

module.exports = dataType[ENV];
