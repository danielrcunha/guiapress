//arquivo pricipal
//importações
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/database");

const categoriesController = require("./categories/CategoriesController")
const articlesController = require("./articles/ArticlesController")
const usersController = require("./users/UsersController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./users/User");



//view engine
app.set('view engine', 'ejs');

//Sessions
app.use(session({
    secret: "fsdkjflksdjfskldjfskd", cookie: { maxAge: 30000000 }
}));

//Static
app.use(express.static('public'));

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//database
connection.authenticate()
    .then(() => {
        console.log("Conexão feita com sucesso!");
    }).catch((error) => {
        console.log(error);
    });

app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController);

app.get("/session", (req, res) => {
    req.session.treinamento = "Formação JS"
    req.session.ano = 2022
    req.session.email = "daniel@gmail.com"
    req.session.user = {
        username: "DanielCunha",
        email: "email@email.com",
        id: 10
    }
    res.send("Sessão gerada!");
});

app.get("/leitura", (req, res) => {
    res.json({
        treinamento: req.session.treinamento,
        ano: req.session.ano,
        email: req.session.email,
        user: req.session.user
    })
});

app.get("/", (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC'],
        ],
        limit: 4
    }).then(articles => {

        Category.findAll().then(categories => {
            res.render("index", { articles: articles, categories: categories });//enviando p/ frontend
        });
    });
});

app.get("/:slug", (req, res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if (article != undefined) {
            Category.findAll().then(categories => {
                res.render("index", { article: article, categories: categories });
            });
        } else {
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/")
    })
});

/*rota que filtra por categoria*/
app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug: slug
        },
        include: [{ model: Article }]
    }).then(category => {
        if (category != undefined) {
            Category.findAll().then(categories => {
                res.render("index", { articles: category.articles, categories: categories })
            })
        } else {
            res.redirect("/");
        }
    }).catch(err => {
        res.redirect("/");
    })
})

app.listen(8080, () => {
    console.log("O servidor está rodando!")
});