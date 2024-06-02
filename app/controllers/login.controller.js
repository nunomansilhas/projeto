const sql = require("../models/db.js");
const bcrypt = require('bcrypt');

// Login function
exports.login = (req, res) => {
    // Verificar se a sessão já está ativa
    if (req.session && req.session.user) {
        return res.send({
            success: true,
            message: "Already logged in.",
            user: req.session.user
        });
    }

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

        bcrypt.compare(password, user.Senha, (err, isMatch) => {
            if (err) {
                console.error("Error comparing password: ", err);
                return res.status(500).send({
                    message: "An error occurred while trying to authenticate the user."
                });
            }

            if (!isMatch) {
                return res.status(401).send({
                    success: false,
                    message: "Invalid credentials."
                });
            }

            // Criar sessão
            req.session.user = {
                id: user.ID,
                nome: user.Nome,
                username: user.username,
                profileImg: user.profileImg,
                cargo: user.Cargo,
                email: user.Email
            };

            return res.send({
                success: true,
                message: "Login successful.",
                user: req.session.user
            });
        });
    });
};

// Logout function
exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send({
                success: false,
                message: "Could not log out. Please try again."
            });
        }
        res.send({
            success: true,
            message: "Logout successful."
        });
    });
};
