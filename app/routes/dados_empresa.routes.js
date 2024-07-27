module.exports = app => {
    const dadosEmpresa = require("../controllers/dados_empresa.controller.js");

    // Rota para buscar os dados da empresa
    app.get("/api/dadosEmpresa", dadosEmpresa.find);

    // Rota para atualizar os dados da empresa
    app.put("/api/dadosEmpresa", dadosEmpresa.update);
};
