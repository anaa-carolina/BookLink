const { DataTypes } = require("sequelize");
const sequelize = require("../db/db");
const Usuario = require("./usuario");
const Livro = require("./livro");

const Comentario = sequelize.define("Comentario", {
  texto: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Comentario.belongsTo(Usuario, {
  foreignKey: "usuarioId",
});
Comentario.belongsTo(Livro, {
  foreignKey: "livroId",
});

module.exports = Comentario;
