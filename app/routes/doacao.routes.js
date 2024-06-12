module.exports = app => {
    const doacoes = require("../controllers/doacao.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Doacao
    router.post("/", doacoes.create);
  
    // Retrieve all Doacoes
    router.get("/", doacoes.findAll);
  
    // Retrieve a single Doacao with id
    router.get("/:id", doacoes.findOne);

    router.get("/produto/:id", doacoes.findByProdutoId);

    router.get("/cliente/:id", doacoes.findByClienteId);
  
    // Update a Doacao with id
    router.put("/:id", doacoes.update);

    router.put("/produto/:id", doacoes.updateByProdutoId);

    router.put("/cliente/:id", doacoes.updateByClienteId);
  
    // Delete a Doacao with id
    router.delete("/:id", doacoes.delete);

    router.delete("/produto/:id", doacoes.deleteByProdutoId);

    router.delete("/cliente/:id", doacoes.deleteByClienteId);
  
    // Delete all Doacoes
    router.delete("/", doacoes.deleteAll);
  
    app.use('/api/doacoes', router);
  };
  