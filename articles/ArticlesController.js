//chamado ROUTER para criar rotas

const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

router.get("/admin/articles", (req, res) => {
    //busca todos os registro do BD com findall e recebe no .then
    Article.findAll({
        include: [{ model: Category }] //JOIN com Category p/ pegar a descrição
    }).then(articles => {
        res.render("admin/articles/index", { articles: articles }) //rederizando para admin/articles/index e repassa para view
    })
})

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then(categories => {
        res.render("admin/articles/new", { categories: categories })
    })

});

router.post("/articles/save", (req, res) => {
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: category
    }).then(() => {
        res.redirect("/admin/articles");
    })

})

module.exports = router;
