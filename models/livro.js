const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");
const Usuario = require("./usuario");

const Livro = sequelize.define("Livro", {
  titulo: DataTypes.STRING,
  descricao: DataTypes.TEXT,
  autor: DataTypes.STRING,
  imagem_url: DataTypes.STRING,
  spoiler: DataTypes.BOOLEAN,
  usuarioId: {
    type: DataTypes.INTEGER,
    references: { model: Usuario, key: "id" },
  },
});

Livro.belongsTo(Usuario, { foreignKey: "usuarioId" });

module.exports = Livro;
