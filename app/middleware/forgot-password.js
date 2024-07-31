const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Funcionario = require('../models/funcionario.model.js'); // Certifique-se de que o caminho está correto
const router = express.Router();

// Configuração do Nodemailer com OAuth2
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'info.projeto.apcvc@gmail.com',
    clientId: '1005093202140-37s2on2er1g3d37d4htffelkfhg4e5jn.apps.googleusercontent.com',
    clientSecret: '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',
    refreshToken: 'YOUR_REFRESH_TOKEN',
  },
});

// Função para gerar uma senha aleatória
function generateRandomPassword(length = 8) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

router.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  Funcionario.findOneByEmail(email, async (err, user) => {
    if (err) {
      console.error('Erro ao procurar o usuário:', err);
      return res.status(500).send({ message: 'Erro ao processar solicitação de recuperação de senha.' });
    }

    if (!user) {
      // Se o usuário não for encontrado, apenas retorne sucesso para não revelar se o email é válido ou não
      return res.status(200).send({ message: 'Caso este email exista, você receberá uma nova senha no seu email.' });
    }

    // Gere uma nova senha
    const newPassword = generateRandomPassword();
    user.senha = newPassword; // Substitua por um hash da senha na vida real

    // Atualize a senha no banco de dados
    Funcionario.updatePasswordById(user.ID, newPassword, (err, data) => {
      if (err) {
        console.error('Erro ao atualizar a senha:', err);
        return res.status(500).send({ message: 'Erro ao processar solicitação de recuperação de senha.' });
      }

      // Envie o email com a nova senha
      const mailOptions = {
        from: 'info.projeto.apcvc@gmail.com',
        to: email,
        subject: 'Redefinição de Senha',
        text: `Sua nova senha é: ${newPassword}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Erro ao enviar email:', error);
          return res.status(500).send({ message: 'Erro ao enviar email.' });
        }
        res.status(200).send({ message: 'Caso este email exista, você receberá uma nova senha no seu email.' });
      });
    });
  });
});

module.exports = router;
