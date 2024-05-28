module.exports = app => {
    const tiposProdutos = require("../controllers/tipo_produto.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", tiposProdutos.create);
  
    router.get("/", tiposProdutos.findAll);
  
    router.get("/:id", tiposProdutos.findOne);
  
    router.put("/:id", tiposProdutos.update);
  
    router.delete("/:id", tiposProdutos.delete);
  
    router.delete("/", tiposProdutos.deleteAll);
  
    app.use('/api/tiposprodutos', router);
  };
  