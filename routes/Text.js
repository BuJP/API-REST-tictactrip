const pool = require("../models/dbConfig");
const validateJwt = require('../middleware/jwtValidation');
const textJustifyValidation = require('../middleware/textJustifyValidation');
const justify = require('../utils/justifyText');
require('dotenv').config();
const router = require("express").Router();
const {getAllJustifiedTextFromUser, addJustifiedText, getDailyRateUsedFromUser}  = require('../models/TextModel');


router.post("/justify", [validateJwt,textJustifyValidation], async(req,res) =>{
    try {
        // 1. recuperer le texte a justifier
        const text = req.body;

        // 2. justifier le texte
        const justifiedText = justify.justify(text,  process.env.MAX_CHARACTER);

        // 3. inserer le texte justifier dans la bdd
        const newText = await addJustifiedText(req.user.email, justifiedText,req.textLength)
        
        
        // 4. retourner le texte justifier
        res.send(justifiedText);
        
       
    } catch (error) {
        console.log(error);
        res.status(500).send("Un problème est survenue sur le serveur");
    }
})

router.get('/justify', [validateJwt], async(req, res)=>{
    texts = await getAllJustifiedTextFromUser(req.user.email)
    dailyRate = await getDailyRateUsedFromUser(req.user.email)

    resp = {
        user:(req.user.email).trim(),
        dailyRateUsed : dailyRate.rows[0].sum ? dailyRate.rows[0].sum : 0,
        texts : texts.rows
    }

    res.json(resp);
})


module.exports = router;