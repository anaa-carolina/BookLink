const Curtida = require("../models/curtida");
const Livro = require("../models/livro");
const Usuario = require("../models/usuario");

// Exemplo: dar like em um livro
exports.like = async (req, res) => {
  try {
    const { usuarioId, livroId } = req.body;
    const curtida = await Curtida.create({ usuarioId, livroId });
    res.status(201).json(curtida);
  } catch (error) {
    console.error("Erro ao curtir livro:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
