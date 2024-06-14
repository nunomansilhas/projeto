module.exports = app => {
  const tiposprodutos = require("../controllers/tipo_produto.controller.js");

  var router = require("express").Router();

  // Create a new TipoProduto
  router.post("/", tiposprodutos.create);

  // Retrieve all TiposProdutos
  router.get("/", tiposprodutos.findAll);

  // Retrieve a single TipoProduto with id
  router.get("/:id", tiposprodutos.findOne);

  // Update a TipoProduto with id
  router.put("/:id", tiposprodutos.update);

  // Delete a TipoProduto with id
  router.delete("/:id", tiposprodutos.delete);

  // Delete all TiposProdutos
  router.delete("/", tiposprodutos.deleteAll);

  app.use('/api/tiposprodutos', router);
};
