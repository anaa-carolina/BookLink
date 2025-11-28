const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuario");

router.post("/usuarios/cadastro", usuarioController.create);
router.post("/usuarios/login", usuarioController.login);
router.get("/usuarios/:id", usuarioController.findOne);

module.exports = router;
