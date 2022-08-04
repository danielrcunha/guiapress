const express = require("express");
const router = express.Router();
const User = require("./User");

router.get("/admin/user", (req, res) => {
    res.send("Listagem de usuario");
});

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create");
});

module.exports = router;