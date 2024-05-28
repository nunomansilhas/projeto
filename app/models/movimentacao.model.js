const sql = require("./db.js");

const Movimentacao = function(movimentacao) {
  this.produtoDeApoioId = movimentacao.produtoDeApoioId;
  this.tipoMovimentacao = movimentacao.tipoMovimentacao;
  this.quantidade = movimentacao.quantidade;
  this.dataMovimentacao = movimentacao.dataMovimentacao;
  this.funcionarioId = movimentacao.funcionarioId;
  this.clienteId = movimentacao.clienteId;
};

Movimentacao.create = (newMovimentacao, result) => {
  sql.query("INSERT INTO movimentacoesinventario SET ?", newMovimentacao, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created movimentacao: ", { id: res.insertId, ...newMovimentacao });
    result(null, { id: res.insertId, ...newMovimentacao });
  });
};

Movimentacao.findById = (id, result) => {
  sql.query(`SELECT * FROM movimentacoesinventario WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found movimentacao: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Movimentacao.getAll = result => {
  sql.query("SELECT * FROM movimentacoesinventario", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("movimentacoes: ", res);
    result(null, res);
  });
};

Movimentacao.updateById = (id, movimentacao, result) => {
  sql.query(
    "UPDATE movimentacoesinventario SET produtoDeApoioId = ?, tipoMovimentacao = ?, quantidade = ?, dataMovimentacao = ?, funcionarioId = ?, clienteId = ? WHERE id = ?",
    [
      movimentacao.produtoDeApoioId,
      movimentacao.tipoMovimentacao,
      movimentacao.quantidade,
      movimentacao.dataMovimentacao,
      movimentacao.funcionarioId,
      movimentacao.clienteId,
      id
    ],
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

      console.log("updated movimentacao: ", { id: id, ...movimentacao });
      result(null, { id: id, ...movimentacao });
    }
  );
};

Movimentacao.remove = (id, result) => {
  sql.query("DELETE FROM movimentacoesinventario WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted movimentacao with id: ", id);
    result(null, res);
  });
};

Movimentacao.removeAll = result => {
  sql.query("DELETE FROM movimentacoesinventario", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} movimentacoes`);
    result(null, res);
  });
};

module.exports = Movimentacao;
