const pool = require("../models/dbConfig");

const router = require("express").Router();
const jwt = require('../utils/jwt');
const validateCredential = require('../middleware/Validation');
const { Router } = require("express");
const {getUser, registerUser}  = require('../models/AuthModel');


router.post("/instription",validateCredential, async(req, res) => {
    try {
        //1. Récupère l'email en déstructurant le body de la requête
        const {email} = req.body;

        //2. Verifier que l'utilisateur n'existe pas
        const user = await getUser(email);

        if(user.rows.length !== 0 ){
            return res.status(401).send({msg:"L'utilisateur existe déjà"}); //unauthorized
        }

        //3. ajouter l'utilisateur
        const newUser = await registerUser(email)

        //4. generer un token jwt
        const token = jwt.generateToken(newUser.rows[0].email);
        
        res.status(201).send({token})

        
    } catch (error) {
        console.log(error);
        res.status(500).send("Un problème est survenue sur le serveur");
    }

});

router.post("/connexion",validateCredential, async(req,res) => {
    try {
        //1. Récupère l'email en déstructurant le body de la requête
        const {email} = req.body;

        //2. verifier que l'utilisateur existe
        const user = await getUser(email);
        if(user.rows.length === 0 ){
            return res.status(401).send({ msg:"Identifient non valide"}); //unauthorized
        }

        //3. generer un token jwt
        const token = jwt.generateToken(user.rows[0].email);

        
        res.json({token});
    } catch (error) {
        console.log(error);
        res.status(500).send("Un problème est survenue sur le serveur");
    }
})

module.exports = router;