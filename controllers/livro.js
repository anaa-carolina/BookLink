const Livro = require("../models/livro");
const Usuario = require("../models/usuario");
const Curtida = require("../models/curtida");

// Listar todos livros (feed)
exports.findAll = async (req, res) => {
  try {
    const livros = await Livro.findAll({
      include: [{ model: Usuario, attributes: ["id", "nome"] }],
      order: [["createdAt", "DESC"]],
    });
    res.json(livros);
  } catch (error) {
    console.error("Erro ao listar livros:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Buscar um livro específico
exports.findOne = async (req, res) => {
  try {
    const livro = await Livro.findByPk(req.params.id, {
      include: [{ model: Usuario, attributes: ["id", "nome"] }],
    });
    if (!livro) return res.status(404).json({ error: "Livro não encontrado" });
    res.json(livro);
  } catch (error) {
    console.error("Erro ao buscar livro:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Criar livro
exports.create = async (req, res) => {
  try {
    const { titulo, descricao, autor, imagem_url, spoiler, usuarioId } =
      req.body;
    if (!titulo || !descricao || !autor || !usuarioId) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios não preenchidos" });
    }
    const livro = await Livro.create({
      titulo,
      descricao,
      autor,
      imagem_url,
      spoiler: spoiler || false,
      usuarioId,
    });
    res.status(201).json(livro);
  } catch (error) {
    console.error("Erro ao criar livro:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Atualizar livro
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Livro.update(req.body, { where: { id } });
    if (!updated)
      return res.status(404).json({ error: "Livro não encontrado" });
    const livro = await Livro.findByPk(id);
    res.json(livro);
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Deletar livro
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Livro.destroy({ where: { id } });
    if (!deleted)
      return res.status(404).json({ error: "Livro não encontrado" });
    res.status(204).send();
  } catch (error) {
    console.error("Erro ao deletar livro:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Listar livros publicados por usuário (perfil)
exports.findByUsuario = async (req, res) => {
  try {
    const livros = await Livro.findAll({
      where: { usuarioId: req.params.usuarioId },
      order: [["createdAt", "DESC"]],
    });
    res.json(livros);
  } catch (error) {
    console.error("Erro ao listar livros do usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};
