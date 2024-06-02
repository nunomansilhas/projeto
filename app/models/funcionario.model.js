const sql = require("./db.js");

const Funcionario = function(funcionario) {
  this.nome     = funcionario.nome;
  this.username = funcionario.username;
  this.cargo    = funcionario.cargo;
  this.email    = funcionario.email;
  this.senha    = funcionario.senha;
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

    result({ kind: "not_found" }, null);
  });
};

Funcionario.getAll = result => {
  sql.query("SELECT * FROM funcionarios", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("funcionarios: ", res);
    result(null, res);
  });
};

Funcionario.updateById = (id, funcionario, result) => {
  sql.query(
    "UPDATE funcionarios SET nome = ?, cargo = ?, email = ?, senha = ? WHERE id = ?",
    [funcionario.nome, funcionario.cargo, funcionario.email, funcionario.senha, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
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
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
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
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} funcionarios`);
    result(null, res);
  });
};

Funcionario.findByUsername = (username, result) => {
  sql.query("SELECT * FROM funcionarios WHERE username = ?", [username], (err, res) => {
      if (err) {
          console.log("Erro: ", err);
          result(err, null);
          return;
      }

      if (res.length) {
          console.log("Encontrado funcionário: ", res[0]);
          result(null, res[0]);
          return;
      }

      result({ kind: "not_found" }, null);
  });
};

module.exports = Funcionario;
