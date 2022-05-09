// ================================ 
// import des modules

const { Sequelize } = require('sequelize')

const mysql_connector = require('mysql');
// ================================ 
// Connexion à la base de donées

let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER,  process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false
    }



)


// ================================ 
// Synchronisation des modéles 
sequelize.sync( err => {
    console.log('Database sync error', err);
})

module.exports = sequelize