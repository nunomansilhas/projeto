const bcrypt = require('bcrypt');
const Funcionario = require("../models/funcionario.model.js");

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.senha, 10);

    // Create a Funcionario
    const funcionario = new Funcionario({
      nome: req.body.nome,
      username: req.body.username,  // Adicionei username aqui, caso você precise
      cargo: req.body.cargo,
      email: req.body.email,
      senha: hashedPassword
    });

    // Save Funcionario in the database
    Funcionario.create(funcionario, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Funcionario."
        });
      else res.send(data);
    });
  } catch (error) {
    res.status(500).send({
      message: "Error encrypting the password."
    });
  }
};

// Outros métodos permanecem inalterados...
exports.findAll = (req, res) => {
  Funcionario.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving funcionarios."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Funcionario.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Funcionario with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Funcionario with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  Funcionario.updateById(
    req.params.id,
    new Funcionario(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Funcionario with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Funcionario with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Funcionario.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Funcionario with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Funcionario with id " + req.params.id
        });
      }
    } else res.send({ message: `Funcionario was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Funcionario.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all funcionarios."
      });
    else res.send({ message: `All Funcionarios were deleted successfully!` });
  });
};
