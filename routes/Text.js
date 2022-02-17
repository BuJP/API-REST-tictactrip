const pool = require("../models/dbConfig");
const validateJwt = require('../middleware/jwtValidation');
const textJustifyValidation = require('../middleware/textJustifyValidation');
const justify = require('../utils/justifyText');
require('dotenv').config();
const router = require("express").Router();

router.post("/justify", [validateJwt,textJustifyValidation], async(req,res) =>{
    try {
        const {text} = req.body;
        const justifiedText = justify.justify(text,  process.env.MAX_CHARACTER);

        console.log(justifiedText)
        res.json(justifiedText);
        
       
    } catch (error) {
        console.log(error);
        res.status(500).send("Un problème est survenue sur le serveur");
    }
})

module.exports = router;