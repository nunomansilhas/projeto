// routes/notificacao.routes.js
module.exports = app => {
    const notificacoes = require("../controllers/notificacao.controller.js");
  
    var router = require("express").Router();
  
    // Rota para criar uma nova notificação
    router.post("/", notificacoes.create);
  
    // Rota para buscar todas as notificações
    router.get("/", notificacoes.findAll);
  
    app.use('/api/notificacoes', router);
  };
  