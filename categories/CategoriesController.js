//chamado ROUTER para criar rotas

const express = require("express");
const router = express.Router();
const Category = require("./Category");
const slugify = require("slugify");

router.get("/admin/categories/new", (req, res) => {
    res.render("admin/categories/new")
});

router.post("/categories/save", (req, res) => {
    var title = req.body.title;
    if (title != undefined) {
        Category.create({
            title: title,
            slug: slugify(title) //slugify tranforma tudo em minusculas sem espaços
        }).then(() => {
            res.redirect("/")
        })

    } else {
        res.redirect("/admin/categories/new");
    }
});

router.get("/admin/categories", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/categories/index", {
            categories: categories
        });
    });
});

/*ROTA P/ DELETAR*/
router.post("/categories/delete", (req, res) => {
    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {//isNan verifica se o id é numerico

            Category.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/categories");
            });

        } else {//não for um número
            res.redirect("/admin/categories");
        }
    } else {//null
        res.redirect("/admin/categories");
    }
});

/*EXPORTANDO*/
module.exports = router;