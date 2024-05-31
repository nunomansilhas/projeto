const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: 'http://localhost'
};

app.use(cors(corsOptions));

// tratamento (parse) de pedidos de content-type - application/json
app.use(express.json());

// tratamento (parse) de pedidos de content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/img', express.static(path.join(__dirname, 'img')));

// route de "entrada" - apenas para efeito de teste
app.get("/", (req, res) => {
  res.json({ message: "API de Gestão de Inventário - Projeto IPVC" });
});

// importação das routes com um argumento de inicialização
require('./app/routes/cliente.routes.js')(app);
require('./app/routes/funcionario.routes.js')(app);
require('./app/routes/produto.routes.js')(app);
require('./app/routes/tipo_produto.routes.js')(app);
require('./app/routes/movimentacao.routes.js')(app);
require('./app/routes/auth.routes.js')(app);
require('./app/routes/notificacao.routes.js')(app);
require('./app/routes/upload.routes.js')(app); // Add this line to include the upload routes

// ativação do servidor, onde serão recebidos os pedidos, na porta definida
app.listen(PORT, () => {
  console.log(`Servidor ativo na porta ${PORT}.`);
});
