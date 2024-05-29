
const Auth = require("../models/auth.model.js");
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Validate request
  if (!username || !password) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Check if the user exists
  Auth.findByUsername(username, (err, user) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: "User not found" });
      } else {
        res.status(500).send({ message: "Error retrieving user" });
      }
      return;
    }

    // Check the password
    bcrypt.compare(password, user.Senha, (err, result) => {
      if (result) {
        // Passwords match
        res.send({ success: true, message: "Login successful" });
      } else {
        // Passwords don't match
        res.status(401).send({ success: false, message: "Invalid credentials" });
      }
    });
  });
};
