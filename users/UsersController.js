const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require('bcryptjs');

router.get("/admin/user", (req, res) => {
    res.send("Listagem de usuario");
});

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create");
});

/*ROTA P/ RECEBER CAD USUÁRIO TIPO POST*/
router.post("/users/create", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    User.create({
        email: email,
        password: hash
    }).then(() => {
        res.redirect("/");
    }).catch((err) => {
        res.redirect("/");
    });

    //se quiser testar no JSON p/ aparecer na tela
    //res.json({ email, password });
});

module.exports = router;