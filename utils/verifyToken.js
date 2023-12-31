const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // const token = req.cookies.accessToken;
  const token = req.headers.data;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "User not authorized" });
  }

  // if token exist
  jwt.verify(token, process.env.APP_JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.role === "admin") {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.role === "admin") {
      next();
    } else {
      return res
        .status(401)
        .json({ success: false, message: "User not authorized" });
    }
  });
};

module.exports = { verifyToken, verifyUser, verifyAdmin };
