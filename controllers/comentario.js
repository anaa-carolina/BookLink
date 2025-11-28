const Comentario = require("../models/comentario");
const Usuario = require("../models/usuario");
const Livro = require("../models/livro");

// Criar comentário
exports.create = async (req, res) => {
  try {
    const { usuarioId, livroId, texto } = req.body;
    if (!usuarioId || !livroId || !texto) {
      return res.status(400).json({ error: "Dados incompletos" });
    }
    const comentario = await Comentario.create({ usuarioId, livroId, texto });
    res.status(201).json(comentario);
  } catch (error) {
    console.error("Erro ao criar comentário:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Listar comentários de um livro
exports.findByLivro = async (req, res) => {
  try {
    const { livroId } = req.params;
    const comentarios = await Comentario.findAll({
      where: { livroId },
      include: [{ model: Usuario, attributes: ["id", "nome"] }],
      order: [["createdAt", "DESC"]],
    });
    res.json(comentarios);
  } catch (error) {
    console.error("Erro ao listar comentários:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
