// login.controller.js

const sql = require("../models/db.js");
const bcrypt = require('bcrypt');

// Login function
exports.login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({
            success: false,
            message: "Username and password are required."
        });
    }

    sql.query("SELECT * FROM funcionarios WHERE username = ?", [username], (err, results) => {
        if (err) {
            console.error("Error: ", err);
            return res.status(500).send({
                message: "An error occurred while trying to authenticate the user."
            });
        }

        if (results.length === 0) {
            return res.status(404).send({
                success: false,
                message: "User not found."
            });
        }

        const user = results[0];

        console.log("User found in database: ", user);

        bcrypt.compare(password, user.Senha, (err, isMatch) => {
            if (err) {
                console.error("Error comparing password: ", err);
                return res.status(500).send({
                    message: "An error occurred while trying to authenticate the user."
                });
            }

            console.log("Stored password hash: ", user.Senha);
            console.log("Password to compare: ", password);
            console.log("Password match result: ", isMatch);

            if (!isMatch) {
                return res.status(401).send({
                    success: false,
                    message: "Invalid credentials."
                });
            }

            // Create session
            req.session.user = {
                id: user.ID,
                nome: user.Nome,
                username: user.username,
                profileImg: user.profileImg,
                cargo: user.Cargo,
                email: user.Email
              };
              
              console.log('Session created for user:', req.session.user); // Verifica se a sessão do usuário foi criada com sucesso
            
              return res.send({
                success: true,
                message: 'Login successful.',
                user: req.session.user
              });
        });
    });
};

exports.logout = (req, res) => {
    // Destrua a sessão do usuário
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            res.status(500).send({
                success: false,
                message: 'Error logging out.'
            });
        } else {
            res.clearCookie('connect.sid'); // Limpe o cookie da sessão
            res.send({
                success: true,
                message: 'Logged out successfully.'
            });
        }
    });
};

exports.lock = (req, res) => {
  if (req.session && req.session.user) {
    req.session.user.locked = true;
    res.send({ success: true });
  } else {
    res.status(401).send({
      success: false,
      message: 'Unauthorized. Please log in.'
    });
  }
};