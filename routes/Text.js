const pool = require("../models/dbConfig");
const validateJwt = require('../middleware/jwtValidation');
const textJustifyValidation = require('../middleware/textJustifyValidation');
const justify = require('../utils/justifyText');
const { append } = require("express/lib/response");
require('dotenv').config();
const router = require("express").Router();



router.post("/justify", [validateJwt,textJustifyValidation], async(req,res) =>{
    try {
        const text = req.body;
        const justifiedText = justify.justify(text,  process.env.MAX_CHARACTER);

        const newText = await pool.query(
            "INSERT INTO justified_text(user_id, text, created_at, length) VALUES ( $1, $2, now(), $3);", [req.user.email, justifiedText,req.textLength]
        );

        res.send(justifiedText);
        
       
    } catch (error) {
        console.log(error);
        res.status(500).send("Un problème est survenue sur le serveur");
    }
})

module.exports = router;