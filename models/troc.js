// ================================ 
// import des modules 


const {DataTypes} = require('sequelize')
let DB = require('../db-config')


// ================================ 
// Définition du modèle Troc

const Troc = DB.define('Troc' , {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    user_id:{
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    title:{
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        defaultValue: '',
        allowNull: false,
    },
    price:
    { 
        type: DataTypes.INTEGER(10),
        defaultValue: 0,
        allowNull: false,
     },
   
 
      
    
},{paranoid: true})  // paranoid =soft delete

// ================================ 
// Synchronisation du modéle
//  Troc.sync()
// Troc.sync({force: true})
// Troc.sync({alter:true})




module.exports = Troc