// ================================ 
// import des modules 

const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

// ================================ 
//Récuperation du router express

let router = express.Router()

// ================================ 
//Routage de la ressource User

router.post('./login', (req,res)=> {
    const {email,password} = req.body

    //Vérification des données recu
    if(!email || !password) {
        return res.status(400).json({message:'Bad email or passsword'})
    }

    User.findOne({where: {email:email}, raw:true})
    .then(user => {
        // Vérifications si l'uttilisateur éxiste
        if(user === null){
            return res.status(401).json({message:'This user does exists!'})
        }
        // Vérifications du mot de passe
        bcrypt.compare(password,user.password)
        .then( test => {
            if(!test){
                return res.status(401).json({message:'Wrong passwords'})
            }

            //génération du token 
            const token = jwt.sign({
                id: user.id,
                prenom: user.prenom,
                email: user.email
            }, process.env.JWT_SECRET, {expiresIn:process.env.JWT_DURING})

            return res.json({access_token: token})

        })
        .catch(err => res.status(500).json({message: 'logging process fail ', error: err}))

    })
    .catch(err =>res.status(500).json({message:'⛔️ Database error', error: err}))
})
