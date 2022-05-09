

// ================================ 
// import des modules

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// ================================ 
// import de la connection à la database

let DB = require('./db-config')


// ================================ 
// Innitiallisation de l'API 

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

// ================================ 
// Import des modules de routages

const user_router = require('./routes/users')
const troc_router = require('./routes/trocs')

app.use('/users', user_router)
app.use('/trocs', troc_router)



// ================================ 
// Mise en place du routage

app.get(`/`,(req,res) => res.send(`🌏🌏 Im online ! 🌏🌏   well done 👍`))
app.get('*',(req,res) => res.status(501).send(`What the hell are you doing`))


// ================================ 
// Start server avec test database

DB.authenticate()
    .then(() => console.log('✅ database connection 🆗'))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`✅ This server running on port ${process.env.SERVER_PORT}. Have fun 👍👍`);
        })
    })
    .catch(err => console.log(`⛔️ Database connexion error : ${err}`))




