const {Sequelize} = require('sequelize')

//conectando com o banco
const sequelize = new Sequelize('thoughts', 'root', 'admin',{
    host:'localhost',
    dialect:'mysql',
})

//autenticando
try{
    sequelize.authenticate()
    console.log('Conexao feita.')
}catch(err){
    console.log(`Nao foi possivel conectar: ${err}`)
}

//exportando conexao
module.exports = sequelize