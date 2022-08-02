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

router.post("/articles/delete", (req, res) => {
    var id = req.body.id;
    if (id != undefined) {
        if (!isNaN(id)) {//isNan verifica se o id é numerico

            Article.destroy({
                where: {
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/articles");
            });

        } else {//não for um número
            res.redirect("/admin/articles");
        }
    } else {//null
        res.redirect("/admin/categories");
    }
});

//rota para edição de artigos
router.get("/admin/articles/edit/:id", (req, res) => {
    var id = req.params.id;
    Article.findByPk(id).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render("admin/articles/edit", { categories: categories, article: article })
            });
        } else {
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    });
});

/*rota para alterar de artigos*/
router.post("/articles/update", (req, res) => {
    var id = req.body.id;
    var title = req.body.title;
    var body = req.body.body;
    var category = req.body.category

    Article.update({ title: title, body: body, categoryId: category, slug: slugify(title) }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/articles");
    }).catch(err => {
        res.redirect("/")
    });
});

/*ROTA DE PAGINAÇÃO*/
router.get("/articles/page/:num", (req, res) => {
    var page = req.params.num;

    if (isNaN(page) || page == 1) {
        offset = 0;
    } else {
        offset = parseInt(page) * 2; // parseInt converte valor texto p valor numerico
    }

    Article.findAndCountAll({
        limit: 4, /*indica quantos artigos serão mostrados na tela*/
        offset: offset,
        order: [
            ['id', 'DESC']
        ]
    }).then(articles => {

        var next;
        if (offset + 4 >= articles.count) {
            next = false;
            console.log('Chegamos na última pagina!');
        } else {
            next = true;
        }

        var result = {
            next: next,
            articles: articles
        }

        Category.findAll().then(categories => {
            res.render("admin/articles/page", { result: result, categories: categories })
        });

        //res.json(result); //usar só se quiser ver o texto no JSON
    })
})

module.exports = router;
