module.exports = app => {
    const movimentacoes = require("../controllers/movimentacao.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", movimentacoes.create);
  
    router.get("/", movimentacoes.findAll);
  
    router.get("/:id", movimentacoes.findOne);
  
    router.put("/:id", movimentacoes.update);
  
    router.delete("/:id", movimentacoes.delete);
  
    router.delete("/", movimentacoes.deleteAll);
  
    app.use('/api/movimentacoes', router);
  };
  