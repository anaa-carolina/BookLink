const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuario");
// outros controllers idem

router.post("/usuarios/cadastro", usuarioController.create);
router.post("/usuarios/login", usuarioController.login);
router.get("/usuarios/:id", usuarioController.findOne);

module.exports = router;
