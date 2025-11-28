const sequelize = require("../db/db");
const { DataTypes } = require("sequelize");
const Usuario = require("./usuario");
const Livro = require("./livro");

const Curtida = sequelize.define("Curtida", {
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Usuario, key: "id" },
  },
  livroId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: Livro, key: "id" },
  },
});

// Relacionamentos
Curtida.belongsTo(Usuario, { foreignKey: "usuarioId" });
Curtida.belongsTo(Livro, { foreignKey: "livroId" });

module.exports = Curtida;
