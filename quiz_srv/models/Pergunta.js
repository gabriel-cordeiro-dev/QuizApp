const { DataTypes } = require('sequelize')
const conn = require('../db')

const Pergunta = conn.define('perguntas', {
    pergunta: DataTypes.STRING,
    resposta: DataTypes.STRING,
    alternativa_um: DataTypes.STRING,
    alternativa_dois: DataTypes.STRING,
    alternativa_tres: DataTypes.STRING,
})

module.exports = Pergunta