module.exports = app => {
    const produtos = require("../controllers/produto.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", produtos.create);
  
    router.get("/", produtos.findAll);
  
    router.get("/:id", produtos.findOne);
  
    router.put("/:id", produtos.update);
  
    router.delete("/:id", produtos.delete);
  
    router.delete("/", produtos.deleteAll);

    app.put("/api/produtos/quantidade/:id", produtos.updateQuantidade);
    
    app.use('/api/produtos', router);
  };
  