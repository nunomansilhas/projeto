const TipoProduto = require("../models/tipo_produto.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const tipoProduto = new TipoProduto({
    nome: req.body.nome
  });

  TipoProduto.create(tipoProduto, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the TipoProduto."
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  TipoProduto.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tiposProdutos."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  TipoProduto.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found TipoProduto with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving TipoProduto with id " + req.params.id
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
  }

  TipoProduto.updateById(
    req.params.id,
    new TipoProduto(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found TipoProduto with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating TipoProduto with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  TipoProduto.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found TipoProduto with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete TipoProduto with id " + req.params.id
        });
      }
    } else res.send({ message: `TipoProduto was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  TipoProduto.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all tiposProdutos."
      });
    else res.send({ message: `All TiposProdutos were deleted successfully!` });
  });
};
