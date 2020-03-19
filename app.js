const express = require("express");
const app = express();

const apiRouter = require("./routers/api.router");

app.use(express.json());

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  const { code } = err;
  if (code === "22P02") {
    res.status(400).send({ message: "Invalid id or data input" });
  } else if (code === "23502") {
    res.status(400).send({ message: "Required input data not found" });
  } else if (code === "23503") {
    res.status(400).send({ message: "Article does not exist" });
  } else if (code === "42703") {
    res.status(400).send({ message: "Article property does not exist" });
  } else {
    const { status, message } = err;
    res.status(status).send({ message });
  }
});

module.exports = app;
