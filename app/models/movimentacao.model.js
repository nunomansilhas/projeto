const sql = require("./db.js");

const Movimentacao = function(movimentacao) {
  this.produtoDeApoioId = movimentacao.ProdutoDeApoioID;
  this.tipoMovimentacao = movimentacao.TipoMovimentacao;
  this.quantidade = movimentacao.Quantidade;
  this.dataMovimentacao = movimentacao.DataMovimentacao;
  this.dataEntrega = movimentacao.DataEntrega;
  this.funcionarioId = movimentacao.FuncionarioID;
  this.clienteId = movimentacao.ClienteID;
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
  sql.query("SELECT * FROM movimentacoesinventario WHERE id = ?", [id], (err, res) => {
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

Movimentacao.findByIdProduto = (id, result) => {
  sql.query(`SELECT * FROM movimentacoesinventario WHERE ProdutoDeApoioID = ?`, [id], (err, res) => {
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

Movimentacao.findByIdBeneficiario = (id, result) => {
  sql.query(`SELECT * FROM movimentacoesinventario WHERE ClienteID = ?`, [id], (err, res) => {
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
  Movimentacao.findById(id, (err, res) => {
      if (err) {
          result(err, null);
          return;
      }

      const existingMovimentacao = res;

      const updatedMovimentacao = {
          produtoDeApoioId: movimentacao.produtoDeApoioId || existingMovimentacao.ProdutoDeApoioID,
          tipoMovimentacao: movimentacao.tipoMovimentacao || existingMovimentacao.TipoMovimentacao,
          quantidade: movimentacao.quantidade || existingMovimentacao.Quantidade,
          dataMovimentacao: movimentacao.dataMovimentacao || existingMovimentacao.DataMovimentacao,
          dataEntrega: movimentacao.dataEntrega || existingMovimentacao.DataEntrega,
          funcionarioId: movimentacao.funcionarioId || existingMovimentacao.FuncionarioID,
          clienteId: movimentacao.clienteId || existingMovimentacao.ClienteID,
      };

      sql.query(
          "UPDATE movimentacoesinventario SET ProdutoDeApoioID = ?, TipoMovimentacao = ?, Quantidade = ?, DataMovimentacao = ?, DataEntrega = ?, FuncionarioID = ?, ClienteID = ? WHERE ID = ?",
          [
              updatedMovimentacao.produtoDeApoioId,
              updatedMovimentacao.tipoMovimentacao,
              updatedMovimentacao.quantidade,
              updatedMovimentacao.dataMovimentacao,
              updatedMovimentacao.dataEntrega,
              updatedMovimentacao.funcionarioId,
              updatedMovimentacao.clienteId,
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

              console.log("updated movimentacao: ", { id: id, ...updatedMovimentacao });
              result(null, { id: id, ...updatedMovimentacao });
          }
      );
  });
};

Movimentacao.updateByIdProduto = (id, movimentacao, result) => {
  sql.query(
    "UPDATE movimentacoesinventario SET tipoMovimentacao = ?, quantidade = ?, dataMovimentacao = ?, funcionarioId = ?, clienteId = ? WHERE ProdutoDeApoioID = ?",
    [
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
  sql.query("DELETE FROM movimentacoesinventario WHERE id = ?", [id], (err, res) => {
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

Movimentacao.removeByIdProduto = (id, result) => {
  sql.query("DELETE FROM movimentacoesinventario WHERE produtoDeApoioId = ?", [id], (err, res) => {
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
