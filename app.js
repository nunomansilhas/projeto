const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const authMiddleware = require('./app/middleware/auth');
const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost', // Certifique-se de que isso é igual ao domínio do seu frontend
  credentials: true // Permitir credenciais (cookies, cabeçalhos de autorização, etc.)
};

app.use(cors(corsOptions));

// Configuração do express-session
app.use(session({
  secret: 'your_secret_key',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true } // Para desenvolvimento, em produção use secure: true com HTTPS
}));

// Tratamento (parse) de pedidos de content-type - application/json
app.use(express.json());

// Tratamento (parse) de pedidos de content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/img', express.static(path.join(__dirname, 'img')));

// Importação da rota de login sem proteção de middleware
require('./app/routes/login.routes.js')(app);

// Aplica o middleware de autenticação a todas as rotas abaixo desta linha
app.use(authMiddleware);

// Importação das routes com um argumento de inicialização
require('./app/routes/cliente.routes.js')(app);
require('./app/routes/funcionario.routes.js')(app);
require('./app/routes/produto.routes.js')(app);
require('./app/routes/tipo_produto.routes.js')(app);
require('./app/routes/movimentacao.routes.js')(app);
require('./app/routes/notificacao.routes.js')(app);
require('./app/routes/upload.routes.js')(app);

// Ativação do servidor, onde serão recebidos os pedidos, na porta definida
app.listen(PORT, () => {
  console.log(`Servidor ativo na porta ${PORT}.`);
});
