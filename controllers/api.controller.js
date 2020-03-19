exports.methodError = (req, res, next) => {
  res.status(405).send({ message: "Invalid method on api endpoint" });
};
