// models/notificacao.model.js
const sql = require("./db.js");

// Construtor para o modelo Notificacao
const Notificacao = function(notificacao) {
  this.id_utilizador = notificacao.id_utilizador;
  this.tipo_acao = notificacao.tipo_acao;
  this.descricao_acao = notificacao.descricao_acao;
  this.status = notificacao.status;
};

// Método para criar uma nova notificação
Notificacao.create = (newNotificacao, result) => {
  sql.query("INSERT INTO notificacoes SET ?", newNotificacao, (err, res) => {
    if (err) {
      console.log("Erro: ", err);
      result(err, null);
      return;
    }

    console.log("Notificação criada: ", { id: res.insertId, ...newNotificacao });
    result(null, { id: res.insertId, ...newNotificacao });
  });
};

// Método para buscar todas as notificações
Notificacao.getAll = result => {
  sql.query("SELECT * FROM notificacoes ORDER BY data_acao DESC LIMIT 10", (err, res) => {
    if (err) {
      console.log("Erro: ", err);
      result(null, err);
      return;
    }

    console.log("Notificações: ", res);
    result(null, res);
  });
};

// Exporta o modelo Notificacao
module.exports = Notificacao;
