const Usuario = require("../models/usuario");

const create = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: "Preencha todos os campos" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "E-mail inválido" });
    }

    if (senha.length < 6) {
      return res
        .status(400)
        .json({ error: "Senha deve ter pelo menos 6 caracteres" });
    }

    const usuario = await Usuario.create({ nome, email, senha });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    // devolve todos os dados do usuário
    res.json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      descricao: usuario.descricao,
      avatar: usuario.avatar,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const findOne = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { create, login, findOne };
