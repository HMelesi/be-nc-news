exports.methodError = (req, res, next) => {
  res.status(405).send({ message: "Invalid method on endpoint" });
};

exports.errorHandler = (err, req, res, next) => {
  const { code } = err;
  if (code) {
    sqlErrorHandler(err, req, res, next);
  } else {
    serverErrorHandler(err, req, res, next);
  }
};

const sqlErrorHandler = (err, req, res, next) => {
  const { code } = err;
  if (code === "22P02") {
    res.status(400).send({ message: "Invalid id or data input" });
  } else if (code === "23502") {
    res.status(400).send({ message: "Required input data not found" });
  } else if (code === "23503") {
    res.status(400).send({ message: "Article does not exist" });
  } else if (code === "42703") {
    res.status(400).send({ message: "Article property does not exist" });
  }
};

const serverErrorHandler = (err, req, res, next) => {
  const { status, message } = err;
  res.status(status).send({ message });
};
