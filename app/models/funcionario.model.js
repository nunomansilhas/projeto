const sql = require("./db.js");

// constructor
const Funcionario = function(funcionario) {
  this.nome = funcionario.nome;
  this.username = funcionario.username;
  this.cargo = funcionario.cargo;
  this.email = funcionario.email;
  this.senha = funcionario.senha;
  this.profileImg = funcionario.profileImg;
};

Funcionario.create = (newFuncionario, result) => {
  sql.query("INSERT INTO funcionarios SET ?", newFuncionario, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created funcionario: ", { id: res.insertId, ...newFuncionario });
    result(null, { id: res.insertId, ...newFuncionario });
  });
};

Funcionario.findById = (id, result) => {
  sql.query(`SELECT * FROM funcionarios WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found funcionario: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Funcionario with the id
    result({ kind: "not_found" }, null);
  });
};

Funcionario.getAll = result => {
  sql.query("SELECT * FROM funcionarios", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("funcionarios: ", res);
    result(null, res);
  });
};

Funcionario.updateById = (id, funcionario, result) => {
  sql.query(
    "UPDATE funcionarios SET nome = ?, username = ?, cargo = ?, email = ?, profileImg = ? WHERE id = ?",
    [funcionario.nome, funcionario.username, funcionario.cargo, funcionario.email, funcionario.profileImg, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Funcionario with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated funcionario: ", { id: id, ...funcionario });
      result(null, { id: id, ...funcionario });
    }
  );
};

Funcionario.remove = (id, result) => {
  sql.query("DELETE FROM funcionarios WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Funcionario with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted funcionario with id: ", id);
    result(null, res);
  });
};

Funcionario.removeAll = result => {
  sql.query("DELETE FROM funcionarios", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log(`deleted ${res.affectedRows} funcionarios`);
    result(null, res);
  });
};

Funcionario.updatePasswordById = (id, hashedPassword, result) => {
  sql.query(
      "UPDATE funcionarios SET senha = ? WHERE id = ?",
      [hashedPassword, id],
      (err, res) => {
          if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
          }

          if (res.affectedRows == 0) {
              // not found Funcionario with the id
              result({ kind: "not_found" }, null);
              return;
          }

          console.log("updated password for funcionario: ", { id: id });
          result(null, { id: id });
      }
  );
};

// Adicione esta função ao seu modelo Funcionario
Funcionario.findOneByEmail = (email, result) => {
  sql.query("SELECT * FROM funcionarios WHERE email = ?", [email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found funcionario: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Funcionario with the email
    result({ kind: "not_found" }, null);
  });
};


module.exports = Funcionario;
