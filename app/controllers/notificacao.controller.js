// controllers/notificacao.controller.js
const Notificacao = require("../models/notificacao.model.js");

// Método para criar uma nova notificação
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Conteúdo não pode ser vazio!"
    });
  }

  const notificacao = new Notificacao({
    id_utilizador: req.body.id_utilizador,
    tipo_acao: req.body.tipo_acao,
    descricao_acao: req.body.descricao_acao,
    data_acao: req.body.data_acao,
    status: req.body.status
  });

  Notificacao.create(notificacao, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocorreu um erro ao criar a notificação."
      });
    else res.send(data);
  });
};

// Método para buscar todas as notificações
exports.findAll = (req, res) => {
  Notificacao.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocorreu um erro ao buscar as notificações."
      });
    else res.send(data);
  });
};
