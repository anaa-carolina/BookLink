const Usuario = require("../models/usuario");

// Cadastro de usuário
const create = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const usuario = await Usuario.create({ nome, email, senha });
    res.status(201).json(usuario);
  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.status(500).json({ error: error.message });
  }
};

// Login de usuário
const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }

    if (usuario.senha !== senha) {
      return res.status(401).json({ error: "Senha incorreta" });
    }

    res.json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      descricao: usuario.descricao || null,
      avatar: usuario.avatar || null,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: error.message });
  }
};

// Buscar usuário por ID
const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { create, login, findOne };
