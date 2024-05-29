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

  console.log(`Attempting login with username: ${username}`);

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

    console.log(`User found: ${JSON.stringify(user)}`);
    
    const storedPasswordHash = user.Senha;
    console.log(`Stored password hash: "${storedPasswordHash}"`);
    console.log(`Password to compare: "${password}"`);

    // Check the password
    bcrypt.compare(password, storedPasswordHash, (err, result) => {
      if (err) {
        console.error('Error during bcrypt comparison:', err);
        res.status(500).send({ message: "Error during password comparison" });
        return;
      }

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
