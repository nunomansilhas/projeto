const Produto = require("../models/produto.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Criar um novo Produto com os dados recebidos
  const produto = new Produto({
    id: req.body.idProduto, // Adicione este campo se necessário no modelo Produto
    nome: req.body.nome,
    descricao: req.body.descricao,
    tipoProdutoId: req.body.tipoProdutoId,
    disponibilidade: req.body.disponibilidade,
    quantidade: req.body.quantidade,
    donativo: req.body.donativo, // Certifique-se de que o modelo Produto suporta esse campo
    img: req.body.img // Certifique-se de que o modelo Produto suporta esse campo
  });

  Produto.create(produto, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Produto."
      });
    } else {
      res.send(data);
    }
  });
};


exports.findAll = (req, res) => {
  Produto.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving produtos."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Produto.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Produto with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Produto with id " + req.params.id
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

  Produto.updateById(
    req.params.id,
    new Produto(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Produto with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Produto with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Produto.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Produto with id ${req.params.id}.`
        });
      } else {
        res.status (500).send({
          message: "Could not delete Produto with id " + req.params.id
        });
      }
    } else res.send({ message: `Produto was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Produto.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all produtos."
      });
    else res.send({ message: `All Produtos were deleted successfully!` });
  });
};
