const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projeto-produtos', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

try{
    sequelize.authenticate();
    console.log("CONEXÃO NO SEQUELIZE BEM SUCEDIDA!");
}catch(err){
    console.log("NÃO FOI POSSÍVEL CONECTAR: ", err);
}

module.exports = sequelize;