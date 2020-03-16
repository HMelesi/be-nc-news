const express = require("express");
const app = express();

const apiRouter = require("./routers/api.router");

app.use(express.json());

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  //   console.log(err);
  res.status(404).send({ message: "Page does not exist" });
});

module.exports = app;
