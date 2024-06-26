const Movimentacao = require("../models/movimentacao.model.js");

// Create and Save a new Movimentacao
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
      res.status(400).send({
          message: "Content can not be empty!"
      });
      return;
  }

  // Create a Movimentacao
  const movimentacao = new Movimentacao({
      ProdutoDeApoioID: req.body.produtoDeApoioID,
      TipoMovimentacao: req.body.TipoMovimentacao,
      Quantidade: req.body.Quantidade,
      DataMovimentacao: req.body.DataMovimentacao,
      DataEntrega: req.body.DataEntrega,
      FuncionarioID: req.body.FuncionarioID,
      ClienteID: req.body.ClienteID
  });

  // Save Movimentacao in the database
  Movimentacao.create(movimentacao, (err, data) => {
      if (err)
          res.status(500).send({
              message: err.message || "Some error occurred while creating the Movimentacao."
          });
      else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Movimentacao.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving movimentacoes."
      });
      return;
    }
    res.send(data);
  });
};

exports.findOne = (req, res) => {
  Movimentacao.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Movimentacao with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Movimentacao with id " + req.params.id
        });
      }
      return;
    }
    res.send(data);
  });
};

exports.findOneByIdProduto = (req, res) => {
  Movimentacao.findByIdProduto(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Movimentacao with idProduto ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Movimentacao with idProduto " + req.params.id
        });
      }
      return;
    }
    res.send(data);
  });
};

exports.findOneByIdBeneficiario = (req, res) => {
  Movimentacao.findByIdBeneficiario(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Movimentacao with idProduto ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Movimentacao with idProduto " + req.params.id
        });
      }
      return;
    }
    res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
      res.status(400).send({
          message: "Content can not be empty!"
      });
      return;
  }

  const movimentacao = new Movimentacao(req.body);

  Movimentacao.updateById(
      req.params.id,
      movimentacao,
      (err, data) => {
          if (err) {
              if (err.kind === "not_found") {
                  res.status(404).send({
                      message: `Not found Movimentacao with id ${req.params.id}.`
                  });
              } else {
                  res.status(500).send({
                      message: "Error updating Movimentacao with id " + req.params.id
                  });
              }
              return;
          }
          res.send(data);
      }
  );
};

exports.updateByIdProduto = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  Movimentacao.updateByIdProduto(
    req.params.id,
    new Movimentacao(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Movimentacao with idProduto ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Movimentacao with idProduto " + req.params.id
          });
        }
        return;
      }
      res.send(data);
    }
  );
};

exports.delete = (req, res) => {
  Movimentacao.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Movimentacao with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Movimentacao with id " + req.params.id
        });
      }
      return;
    }
    res.send({ message: `Movimentacao was deleted successfully!` });
  });
};

exports.deleteByIdProduto = (req, res) => {
  Movimentacao.removeByIdProduto(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Movimentacao with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Movimentacao with id " + req.params.id
        });
      }
      return;
    }
    res.send({ message: `Movimentacao was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Movimentacao.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all movimentacoes."
      });
      return;
    }
    res.send({ message: `All Movimentacoes were deleted successfully!` });
  });
};
