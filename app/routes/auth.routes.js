import bcrypt from 'bcrypt';
import sql from '../models/db.js'; // Ajuste o caminho conforme necessário

const plainPassword = 'password123';
const saltRounds = 10;

bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
    if (err) {
        console.error("Error hashing password: ", err);
        return;
    }

    console.log("New hashed password: ", hash);
    // Atualize a senha no banco de dados com o novo hash
    sql.query("UPDATE funcionarios SET Senha = ? WHERE username = ?", [hash, 'pedrocosta'], (err, result) => {
        if (err) {
            console.error("Error updating password: ", err);
        } else {
            console.log("Password updated successfully");
        }
    });
});
