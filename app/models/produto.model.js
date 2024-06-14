const sql = require("./db.js");

const Produto = function(produto) {
  this.id = produto.id;
  this.nome = produto.nome;
  this.descricao = produto.descricao;
  this.tipoProdutoId = produto.tipoProdutoId;
  this.disponibilidade = produto.disponibilidade;
  this.quantidade = produto.quantidade;
  this.donativo = produto.donativo;
};

Produto.create = (newProduto, result) => {
  sql.query("INSERT INTO produtosdeapoio SET ?", newProduto, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created produto: ", { id: res.insertId, ...newProduto });
    result(null, { id: res.insertId, ...newProduto });
  });
};

Produto.findById = (id, result) => {
  sql.query(`SELECT * FROM produtosdeapoio WHERE id = "${id}"`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found produto: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Produto.getAll = result => {
  sql.query("SELECT * FROM produtosdeapoio", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("produtos: ", res);
    result(null, res);
  });
};

Produto.updateById = (id, produto, result) => {
  sql.query(
    `UPDATE produtosdeapoio SET id = ?, nome = ?, descricao = ?, tipoProdutoId = ?, disponibilidade = ?, donativo = ?, quantidade = ? WHERE id = "${id}"`,
    [produto.id, produto.nome, produto.descricao, produto.tipoProdutoId, produto.disponibilidade, produto.donativo, produto.quantidade],
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

      console.log("updated produto: ", { id: id, ...produto });
      result(null, { id: id, ...produto });
    }
  );
};

Produto.remove = (id, result) => {
  sql.query(`DELETE FROM produtosdeapoio WHERE id = "${id}"`, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted produto with id: ", id);
    result(null, res);
  });
};

Produto.removeAll = result => {
  sql.query("DELETE FROM produtosdeapoio", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} produtos`);
    result(null, res);
  });
};

Produto.updateQuantidadeById = (id, quantidade, result) => {
  sql.query(
      "UPDATE produtosdeapoio SET quantidade = ? WHERE id = ?",
      [quantidade, id],
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

          console.log("updated produto quantity: ", { id: id, quantidade: quantidade });
          result(null, { id: id, quantidade: quantidade });
      }
  );
};


module.exports = Produto;
