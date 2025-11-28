const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./db/db");
const rotas = require("./routes/rotas");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use("/api", rotas);

const PORT = process.env.PORT || 3000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Tabelas sincronizadas com sucesso!");
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((err) => console.error("Erro ao sincronizar tabelas:", err));
