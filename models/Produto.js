const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Produto = db.define('Produto', {
   
    serviço: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    preço: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true
    },
    categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true
    },
})


module.exports = Produto;
