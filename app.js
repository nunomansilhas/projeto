const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const authMiddleware = require('./app/middleware/auth');
const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost', 
  credentials: true 
};

app.use(cors(corsOptions));

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/img', express.static(path.join(__dirname, 'img')));

require('./app/routes/login.routes.js')(app);

require('./app/routes/cliente.routes.js')(app, authMiddleware);
require('./app/routes/funcionario.routes.js')(app, authMiddleware);
require('./app/routes/produto.routes.js')(app, authMiddleware);
require('./app/routes/tipo_produto.routes.js')(app, authMiddleware);
require('./app/routes/movimentacao.routes.js')(app, authMiddleware);
require('./app/routes/notificacao.routes.js')(app, authMiddleware);
require('./app/routes/upload.routes.js')(app, authMiddleware);
require("./app/routes/doacao.routes.js")(app, authMiddleware);
require("./app/routes/dados_empresa.routes.js")(app, authMiddleware);

app.listen(PORT, () => {
  console.log(`Servidor ativo na porta ${PORT}.`);
});
