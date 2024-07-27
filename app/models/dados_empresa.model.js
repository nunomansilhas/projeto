const sql = require("./db.js"); // Importa a configuração da conexão com o banco

const DadosEmpresa = function(dados) {
    this.contribuinte = dados.contribuinte;
    this.endereco = dados.endereco;
    this.cidade = dados.cidade;
    this.telefone = dados.telefone;
    this.email = dados.email;
};

DadosEmpresa.getDados = (result) => {
    sql.query("SELECT * FROM dados_empressa WHERE id = 1", (err, res) => {
        if (err) {
            console.log("Erro: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("Dados encontrados: ", res[0]);
            result(null, res[0]);
            return;
        }

        // Não encontrou dados com o ID 1
        result({ kind: "not_found" }, null);
    });
};

DadosEmpresa.updateById = (id, dadosEmpresa, result) => {
    sql.query(
        "UPDATE dados_empressa SET contribuinte = ?, endereco = ?, cidade = ?, telefone = ?, email = ? WHERE id = ?",
        [dadosEmpresa.contribuinte, dadosEmpresa.endereco, dadosEmpresa.cidade, dadosEmpresa.telefone, dadosEmpresa.email, id],
        (err, res) => {
            if (err) {
                console.log("Erro: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // Não encontrou registros para atualizar
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("Dados atualizados: ", { id: id, ...dadosEmpresa });
            result(null, { id: id, ...dadosEmpresa });
        }
    );
};

module.exports = DadosEmpresa;
