const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Usuario = db.define('Usuario', {
   
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
   email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
   senha: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    confirmacaoSenha: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    gerente: {
        type: DataTypes.BOOLEAN,
    },
        
})


module.exports = Usuario;