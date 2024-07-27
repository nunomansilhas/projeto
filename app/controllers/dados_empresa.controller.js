const DadosEmpresa = require("../models/dados_empresa.model.js");

// Buscar dados da empresa
exports.find = (req, res) => {
    DadosEmpresa.getDados((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Ocorreu um erro ao buscar os dados da empresa."
            });
        } else {
            res.send(data);
        }
    });
};

// Atualizar dados da empresa
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "O conteúdo não pode estar vazio!"
        });
    }

    DadosEmpresa.updateById(
        1, // ID é fixo pois temos apenas uma linha nesta tabela
        new DadosEmpresa(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Não foi encontrado dados da empresa com id 1.`
                    });
                } else {
                    res.status(500).send({
                        message: "Erro ao atualizar dados da empresa com id 1"
                    });
                }
            } else res.send(data);
        }
    );
};
