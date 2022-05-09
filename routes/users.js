// ================================ 
// import des modules 

const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')

// ================================ 
//Récuperation du router express

let router = express.Router()

// ================================ 
//Routage de la ressource User



// ================================ 
//Récupperation de tous les uttilisateurs
router.get('/', (req,res) => {
    User.findAll()
        .then(users => res.json({ message: ' ✅Tous les uttilisateur ont étè trouvé', data: users}))
        .catch(err => res.status(500).json({message: `⛔️ Database Error`, error: err}))
})

// ================================ 
//Récupperation d'un uttilisateur avec son identifiant'

router.get('/:id', (req,res) => {
    let userId = parseInt(req.params.id)
    //Vérification si le champs id est présent et cohérent 
    if(!userId) {
        return res.json(400).json({message: ' ⛔️ Missing parameter'})
    }
    //Récuperation de l'uttilisateur 
    User.findOne({where:{id: userId}, raw: true})
        .then(user => {
            if((user === null)){
                return res.status(404).json({message: ' ⛔️ This user does not exist !'})
            }
            // Uttilisateur trouvée
            return res.json({data: user})
        }) 
        .catch(err =>res.status(500).json({message:' ⛔️ Database error', error: err}))
})



router.put('', (req,res) => {

    const {nom, prenom, pseudo, email, password } = req.body
    //Validation des donées recu 
    if(!nom || !prenom || !pseudo || !email || !password){
        return res.status(400).json({message: ' ⛔️ Missing Data ⛔️'})
    }
    User.findOne({where:{ email: email}, raw: true})
        .then(user => {
            //Vérification si l'uttisateur existe déjà
            if(user !== null){
                return res.status(409).json({message: `⛔️ This user ${user} already exists ! ⛔️`})
            }

            // hachage du mot de passe de l'uttilisateur 
            
            bcrypt.hash(password, process.env.BCRYPT_SALT_ROUND)
                .then(hash => {
                req.body.password = hash
                
                
            // Création  de l'uttilisateur
                  
            User.create(req.body)
                    .then(user => res.json({message: ' ✅ New user created', data: user}))
                    .catch(err =>res.status(500).json({message:'⛔️ Database error', error: err}))
                })
              

                .catch(err =>res.status(500).json({message:'⛔️ Database error', error: err}))
           
        })
})

router.patch('/:id', (req,res) => {
    let userId = parseInt(req.params.id)
    // Vérification si le champs id est présent et cohérant
    if(!userId) {
        let userId = parseInt(req.params.id)
        return res.json(400).json({message: ' ⛔️ Missing parameter'})
    }
    //recherche de l'uttisateur
    User.findOne({where: {id: user}, raw: true})
    .then(user => {
        //Vérifier si l'uttilisateur existes
        if(user === null) {
            return res.status(404).json({message: ' ⛔️this user does not exists ! '})
        }

        //Mise à jour de l'uttilisateur 

        User.update(rq.body, {where: {id:userId}})
        .then(user => res.json({message: 'User updated', data: user}))
        .catch(err =>res.status(500).json({message:'⛔️ Database error', error: err}))
    })
    .catch(err =>res.status(500).json({message:'⛔️ Database error', error: err}))

})

// ================================ 
//Suppresion d'un uttilisateur


router.post('/untrash/:id', (req,res) => {
    let userId = parseInt(req.params.id)
    // Vérification si le champs id est présent et cohérant
    if(!userId) {
        let userId = parseInt(req.params.id)
        return res.json(400).json({message: ' ⛔️ Missing parameter'})
    }
    User.restore({where: {id: userId}})
    .then(() => res.status(204).json())
    .catch(err =>res.status(500).json({message:'⛔️ Database error', error: err}))
})

router.delete('/trash/:id', (req,res) => {
    let userId = parseInt(req.params.id)
    // Vérification si le champs id est présent et cohérant
    if(!userId) {
        let userId = parseInt(req.params.id)
        return res.json(400).json({message: ' ⛔️ Missing parameter'})
    }
    // Suppresion de l'uttilisateur
    User.destroy({where: {id : userId}})
    .then(() => res.status(204).json({message: '✅ User deleted'}))
    .catch(err =>res.status(500).json({message:'⛔️ Database error', error: err}))
})


router.delete('/:id', (req,res) => {
    let userId = parseInt(req.params.id)
    // Vérification si le champs id est présent et cohérant
    if(!userId) {
        let userId = parseInt(req.params.id)
        return res.json(400).json({message: ' ⛔️ Missing parameter'})
    }
    // Suppresion de l'uttilisateur
    User.destroy({where: {id : userId}, force: true})
    .then(() => res.status(204).json({message: '✅ User deleted'}))
    .catch(err =>res.status(500).json({message:'⛔️ Database error', error: err}))
})


module.exports = router