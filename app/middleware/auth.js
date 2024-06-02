function authMiddleware(req, res, next) {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).send({
      success: false,
      message: "Unauthorized. Please log in."
    });
  }
}

module.exports = authMiddleware;