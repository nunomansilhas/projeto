module.exports = app => {
  const clientes = require("../controllers/cliente.controller.js");
  const upload = require('../middleware/upload');

  var router = require("express").Router();

  router.post("/", upload.single('image_profile'), clientes.create);

  router.get("/", clientes.findAll);

  router.get("/:id", clientes.findOne);

  router.put("/:id", upload.single('image_profile'), clientes.update);

  router.delete("/:id", clientes.delete);

  router.delete("/", clientes.deleteAll);

  app.use('/api/clientes', router);
};
