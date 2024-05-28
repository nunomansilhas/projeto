const sql = require("./db.js");

const TipoProduto = function(tipoProduto) {
  this.nome = tipoProduto.nome;
};

TipoProduto.create = (newTipoProduto, result) => {
  sql.query("INSERT INTO tiposprodutosdeapoio SET ?", newTipoProduto, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tipoProduto: ", { id: res.insertId, ...newTipoProduto });
    result(null, { id: res.insertId, ...newTipoProduto });
  });
};

TipoProduto.findById = (id, result) => {
  sql.query(`SELECT * FROM tiposprodutosdeapoio WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tipoProduto: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

TipoProduto.getAll = result => {
  sql.query("SELECT * FROM tiposprodutosdeapoio", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("tiposProdutos: ", res);
    result(null, res);
  });
};

TipoProduto.updateById = (id, tipoProduto, result) => {
  sql.query(
    "UPDATE tiposprodutosdeapoio SET nome = ? WHERE id = ?",
    [tipoProduto.nome, id],
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

      console.log("updated tipoProduto: ", { id: id, ...tipoProduto });
      result(null, { id: id, ...tipoProduto });
    }
  );
};

TipoProduto.remove = (id, result) => {
  sql.query("DELETE FROM tiposprodutosdeapoio WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted tipoProduto with id: ", id);
    result(null, res);
  });
};

TipoProduto.removeAll = result => {
  sql.query("DELETE FROM tiposprodutosdeapoio", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} tiposProdutos`);
    result(null, res);
  });
};

module.exports = TipoProduto;
