const pool = require("../models/dbConfig");
const validateJwt = require('../middleware/jwtValidation');
const textJustifyValidation = require('../middleware/textJustifyValidation');
const justify = require('../utils/justifyText');
const { append } = require("express/lib/response");
require('dotenv').config();
const router = require("express").Router();



router.post("/justify", [validateJwt,textJustifyValidation], async(req,res) =>{
    try {
        // 1. recuperer le texte a justifier
        const text = req.body;

        // 2. justifier le texte
        const justifiedText = justify.justify(text,  process.env.MAX_CHARACTER);

        // 3. inserer le texte justifier dans la bdd
        const newText = await pool.query(
            "INSERT INTO justified_text(user_id, text, created_at, length) VALUES ( $1, $2, now(), $3);", [req.user.email, justifiedText,req.textLength]
        );
        
        // 4. retourner le texte justifier
        res.send(justifiedText);
        
       
    } catch (error) {
        console.log(error);
        res.status(500).send("Un problème est survenue sur le serveur");
    }
})

module.exports = router;