const logUrl = (req, res, next) => {
  console.log("Request at " + req.url + " - Method: " + req.method);
  next();
};

const errorHandler = (error, res, response, next) => {
  const e = error.toString();
  console.error("Middleware errorHandler! " + e);
  return res.status(400).json({ error: "  Not Found" }, ...err);
};

module.exports = { logUrl, errorHandler };
