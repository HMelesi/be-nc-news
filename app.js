const express = require("express");
const app = express();
const { errorHandler } = require("./handling");

const apiRouter = require("./routers/api.router");

app.use(express.json());

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

module.exports = app;
