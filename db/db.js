// db/db.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("booklink", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com MySQL estabelecida com sucesso!");
  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
  }
})();

module.exports = sequelize;
