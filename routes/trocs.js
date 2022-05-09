// ================================ 
// import des modules 

const express = require('express')
const bcrypt = require('bcrypt')
const Troc = require('../models/troc')

// ================================ 
//Récuperation du router express

let router = express.Router()

// ================================ 
//Routage de la ressource User



// ================================ 
//Récupperation de tous les uttilisateurs
router.get('', (req,res) => {
    Troc.findAll()
        .then(trocs => res.json({ message: ' ✅Tous les Trocs  ont étè trouvé', data: trocs}))
        .catch(err => res.status(500).json({message: `⛔️ Database Error`, error: err}))
})

// ================================ 
//Récupperation d'un uttilisateur avec son identifiant'

router.get('/:id', (req,res) => {
    let trocId = parseInt(req.params.id)
    //Vérification si le champs id est présent et cohérent 
    if(!trocId) {
        return res.json(400).json({message: ' ⛔️ Missing parameter'})
    }
    //Récuperation de l'uttilisateur 
    Troc.findOne({where:{id: trocId}, raw: true})
        .then(user => {
            if((troc === null)){
                return res.status(404).json({message: ' ⛔️ This troc does not exist !'})
            }
            // Uttilisateur trouvée
            return res.json({data: troc})
        }) 
        .catch(err =>res.status(500).json({message:' ⛔️ Database error', error: err}))
})



router.put('', (req,res) => {
    let trocId = parseInt(req.params.id)

    const {title, description} = req.body
    //Validation des donées recu 
    if( !title || !description ){
        return res.status(400).json({message: ' ⛔️ Missing Data'})
    }
   Troc.findOne({where:{ id: trocId}, raw: true})
        .then(troc => {
            //Vérification si l'uttisateur existe déjà
            if(troc != null){
                return res.status(400).json({message: `⛔️ This troc ${troc} already exists !`})
            }

           
                
            // Création  de l'uttilisateur
                  
           Troc.create(req.body)
                    .then(troc => res.json({message: ' ✅ New user created', data:troc}))
                    .catch(err =>res.status(500).json({message:'⛔️ Database error', error: err}))
                })
              

                .catch(err =>res.status(500).json({message:'⛔️ Database error', error: err}))
           
        })


router.patch('/:id', (req,res) => {
    let trocId = parseInt(req.params.id)
    // Vérification si le champs id est présent et cohérant
    if(!trocId) {
        let trocId = parseInt(req.params.id)
        return res.json(400).json({message: ' ⛔️ Missing parameter'})
    }
    //recherche de l'uttisateur
    Troc.findOne({where: {id: trocId}, raw: true})
    .then(troc => {
        //Vérifier si l'uttilisateur existe
        if(troc === null) {
            return res.status(404).json({message: ' ⛔️this troc does not exists ! '})
        }

        //Mise à jour de l'uttilisateur 

       Troc.update(req.body, {where: {id:trocId}})
        .then(troc => res.json({message: 'User updated', data: troc}))
        .catch(err =>res.status(500).json({message:'⛔️ Database error', error: err}))
    })
    .catch(err =>res.status(500).json({message:'⛔️ Database error', error: err}))

})

// ================================ 
//Suppresion d'un uttilisateur


router.post('/untrash/:id', (req,res) => {
    let trocId = parseInt(req.params.id)
    // Vérification si le champs id est présent et cohérant
    if(!trocId) {
        let trocId = parseInt(req.params.id)
        return res.json(400).json({message: ' ⛔️ Missing parameter'})
    }
    Troc.restore({where: {id: trocId}})
    .then(() => res.status(204).json())
    .catch(err =>res.status(500).json({message:'⛔️ Database error', error: err}))
})

router.delete('/trash/:id', (req,res) => {
    let trocId = parseInt(req.params.id)
    // Vérification si le champs id est présent et cohérant
    if(!trocId) {
        let trocId = parseInt(req.params.id)
        return res.json(400).json({message: ' ⛔️ Missing parameter'})
    }
    // Suppresion de l'uttilisateur
    Troc.destroy({where: {id : trocId}})
    .then(() => res.status(204).json({message: '✅ troc deleted'}))
    .catch(err =>res.status(500).json({message:'⛔️ Database error', error: err}))
})


router.delete('/:id', (req,res) => {
    let trocId = parseInt(req.params.id)
    // Vérification si le champs id est présent et cohérant
    if(!trocId) {
        let trocId = parseInt(req.params.id)
        return res.json(400).json({message: ' ⛔️ Missing parameter'})
    }
    // Suppresion de l'uttilisateur
    Troc.destroy({where: {id : trocId}, force: true})
    .then(() => res.status(204).json({message: '✅ troc deleted'}))
    .catch(err =>res.status(500).json({message:'⛔️ Database error', error: err}))
})


module.exports = router