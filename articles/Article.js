const Sequelize = require("sequelize");
const connection = require("../database/database");

//fazendo um relacionamento entre tabelas
const Category = require("../categories/Category") //importar module


const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

//relacionemtno 1 - n com hasMany
Category.hasMany(Article);//uma categoria tem muitos artigos

//relacionamento 1 - 1 com belongsTo
Article.belongsTo(Category);//um artigo pertece a uma categoria

//a linhas abaixo está comentada, porque já criou o Article no BD
//Article.sync({ force: true });

module.exports = Article;