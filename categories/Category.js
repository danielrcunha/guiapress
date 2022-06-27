const Sequelize = require("sequelize");
const connection = require("../database/database");

const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }, slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

//sincronizando com o BD
//a linhas abaixo está comentada, porque já criou o Category no BD
//Category.sync({ force: true })

module.exports = Category;
