const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models");

db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API." });
});

require("./routes/cliente.routes.js")(app);
require("./routes/funcionario.routes.js")(app);
require("./routes/movimentacao.routes.js")(app);
require("./routes/produto.routes.js")(app);
require("./routes/tipo_produto.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
