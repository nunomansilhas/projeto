const sql = require("./db.js");

// constructor
const Doacao = function(doacao) {
    this.ProdutoID = doacao.ProdutoID;
    this.ClienteID = doacao.ClienteID;
    this.Quantidade = doacao.Quantidade;
};

Doacao.create = (newDoacao, result) => {
    sql.query("INSERT INTO doacoes SET ?", newDoacao, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created doacao: ", { id: res.insertId, ...newDoacao });
        result(null, { id: res.insertId, ...newDoacao });
    });
};

Doacao.findById = (id, result) => {
    sql.query(`SELECT * FROM doacoes WHERE ID = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found doacao: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Doacao with the id
        result({ kind: "not_found" }, null);
    });
};

Doacao.findByProdutoId = (produtoId, result) => {
    sql.query(`SELECT * FROM doacoes WHERE ProdutoID = '${produtoId}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found doacoes: ", res);
            result(null, res);
            return;
        }

        // not found Doacao with the produtoId
        result({ kind: "not_found" }, null);
    });
};

Doacao.findByClienteId = (clienteId, result) => {
    sql.query(`SELECT * FROM doacoes WHERE ClienteID = ${clienteId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found doacoes: ", res);
            result(null, res);
            return;
        }

        // not found Doacao with the clienteId
        result({ kind: "not_found" }, null);
    });
};

Doacao.getAll = result => {
    sql.query("SELECT * FROM doacoes", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("doacoes: ", res);
        result(null, res);
    });
};

Doacao.updateById = (id, doacao, result) => {
    sql.query(
        "UPDATE doacoes SET ProdutoID = ?, ClienteID = ?, Quantidade = ? WHERE ID = ?",
        [doacao.ProdutoID, doacao.ClienteID, doacao.Quantidade, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Doacao with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated doacao: ", { id: id, ...doacao });
            result(null, { id: id, ...doacao });
        }
    );
};

Doacao.updateByProdutoId = (produtoId, doacao, result) => {
    sql.query(
        "UPDATE doacoes SET ProdutoID = ?, ClienteID = ?, Quantidade = ? WHERE ProdutoID = ?",
        [doacao.ProdutoID, doacao.ClienteID, doacao.Quantidade, produtoId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Doacao with the produtoId
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated doacao: ", { ProdutoID: produtoId, ...doacao });
            result(null, { ProdutoID: produtoId, ...doacao });
        }
    );
};

Doacao.updateByClienteId = (clienteId, doacao, result) => {
    sql.query(
        "UPDATE doacoes SET ProdutoID = ?, ClienteID = ?, Quantidade = ? WHERE ClienteID = ?",
        [doacao.ProdutoID, doacao.ClienteID, doacao.Quantidade, clienteId],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Doacao with the clienteId
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated doacao: ", { ClienteID: clienteId, ...doacao });
            result(null, { ClienteID: clienteId, ...doacao });
        }
    );
};

Doacao.remove = (id, result) => {
    sql.query("DELETE FROM doacoes WHERE ID = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Doacao with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted doacao with id: ", id);
        result(null, res);
    });
};

Doacao.removeByProdutoId = (produtoId, result) => {
    sql.query("DELETE FROM doacoes WHERE ProdutoID = ?", produtoId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Doacao with the produtoId
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted doacao with ProdutoID: ", produtoId);
        result(null, res);
    });
};

Doacao.removeByClienteId = (clienteId, result) => {
    sql.query("DELETE FROM doacoes WHERE ClienteID = ?", clienteId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Doacao with the clienteId
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted doacao with ClienteID: ", clienteId);
        result(null, res);
    });
};

Doacao.removeAll = result => {
    sql.query("DELETE FROM doacoes", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log(`deleted ${res.affectedRows} doacoes`);
        result(null, res);
    });
};

module.exports = Doacao;
