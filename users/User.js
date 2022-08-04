const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

//sincronizando com o BD
//a linhas abaixo está comentada, porque já criou o Category no BD
//User.sync({ force: true }) //se colocar false não cria a tabela

module.exports = User;
