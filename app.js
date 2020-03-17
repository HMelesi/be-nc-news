const express = require("express");
const app = express();

const apiRouter = require("./routers/api.router");

app.use(express.json());

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  const { code } = err;
  const psqlCodes = ["22P02"];
  if (psqlCodes.includes(code)) {
    res.status(400).send({ message: "Bad request" });
  } else {
    const { status, message } = err;
    res.status(status).send({ message });
  }
});

module.exports = app;
