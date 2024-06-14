module.exports = app => {
  const funcionarios = require("../controllers/funcionario.controller.js");

  var router = require("express").Router();

  // Upload de imagem de perfil
  router.post("/upload", funcionarios.uploadImage);

  // Create a new Funcionario
  router.post("/", funcionarios.uploadImage, funcionarios.create);

  // Retrieve all Funcionarios
  router.get("/", funcionarios.findAll);

  // Retrieve a single Funcionario with id
  router.get("/:id", funcionarios.findOne);

  // Update a Funcionario with id
  router.put("/:id", funcionarios.uploadImage, funcionarios.update);

  // Update password of a Funcionario with id
  router.put("/:id/password", funcionarios.updatePassword);

  // Delete a Funcionario with id
  router.delete("/:id", funcionarios.delete);

  // Delete all Funcionarios
  router.delete("/", funcionarios.deleteAll);

  app.use('/api/funcionarios', router);
};
