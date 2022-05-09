// ================================ 
// import des modules 


const {DataTypes} = require('sequelize')
let DB = require('../db-config')


// ================================ 
// Définition du modèle users 

const User = DB.define('User' , {
    id:
       { 
           type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true
        },
        nom:{
            type: DataTypes.STRING(100),
            defaultVAlue: '',
            allowNul: false
        },
        prenom:{
            type: DataTypes.STRING(100),
            defaultVAlue: '',
            allowNul: false
        },
        pseudo: {
            type: DataTypes.STRING(100),
            defaultVAlue: '',
            allowNul: false,
            unique:true
        },
        email: {
            type: DataTypes.STRING(250),
            validate:{
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING(64),
            is: /^[0-9a-f]{64}$/i // contrainte
        }
    
},{paranoid: true})  // paranoid =soft delete
// ================================ 
// Synchronisation du modéle
// User.sync()
// User.sync({force: true})
// User.sync({alter:true})



module.exports = User