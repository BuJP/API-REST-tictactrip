const pool = require("../models/dbConfig");
require('dotenv').config();
module.exports = async function(req, res, next){
    
    if(req.method === 'POST'){
        // 1. recuperation du texte
        const text = req.body;

        // 2. tester si le texte est present
        if(!text){
            return res.status(401).json({ msg: "Texte à justifier manquant" });
        }

        // 3. recuperer la somme des mots du jour de l'utilisateur
        var rate = await pool.query("select sum(length) from justified_text where user_id = ($1) AND created_at BETWEEN NOW() - INTERVAL '24 HOURS' AND NOW() ", [req.user.email]);
        rate = rate.rows[0].sum ? parseInt(rate.rows[0].sum) : 0;

        // 4. verification que la limite journalière n'est pas atteinte
        var textLength = text.length;
        const verif = rate+textLength

        if(verif >= process.env.DAILY_RATE_LIMIT){
            return res.status(402).json({ msg: "Crédit journalier épuisé" });
        }
        req.textLength = textLength;
        next();
    }

}