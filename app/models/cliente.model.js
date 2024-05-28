const sql = require("./db.js");

const Cliente = function(cliente) {
  this.nome = cliente.nome;
  this.morada = cliente.morada;
  this.email = cliente.email;
  this.telemovel = cliente.telemovel;
};

Cliente.create = (newCliente, result) => {
  sql.query("INSERT INTO clientes SET ?", newCliente, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created cliente: ", { id: res.insertId, ...newCliente });
    result(null, { id: res.insertId, ...newCliente });
  });
};

Cliente.findById = (id, result) => {
  sql.query(`SELECT * FROM clientes WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found cliente: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Cliente.getAll = result => {
  sql.query("SELECT * FROM clientes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("clientes: ", res);
    result(null, res);
  });
};

Cliente.updateById = (id, cliente, result) => {
  sql.query(
    "UPDATE clientes SET nome = ?, morada = ?, email = ?, telemovel = ? WHERE id = ?",
    [cliente.nome, cliente.morada, cliente.email, cliente.telemovel, id],
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

      console.log("updated cliente: ", { id: id, ...cliente });
      result(null, { id: id, ...cliente });
    }
  );
};

Cliente.remove = (id, result) => {
  sql.query("DELETE FROM clientes WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted cliente with id: ", id);
    result(null, res);
  });
};

Cliente.removeAll = result => {
  sql.query("DELETE FROM clientes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} clientes`);
    result(null, res);
  });
};

module.exports = Cliente;
