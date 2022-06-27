//chamado ROUTER para criar rotas

const express = require("express");
const router = express.Router();

router.get("/articles", (req, res) => {
    res.send("ROTA DE ARTIGOS")
});

router.get("/admin/articles/new", (req, res) => {
    res.send("Rota para criar uma novo artigo!")
})

module.exports = router;
