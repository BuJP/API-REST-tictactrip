const pool = require("../models/dbConfig");
require('dotenv').config();
module.exports = async function(req, res, next){
    
    if(req.method === 'POST'){
        const {text} = req.body;
        if(!text){
            return res.status(401).json({ msg: "Texte à justifier manquant" });
        }

        var rate = await pool.query("select sum(length) from justified_text where user_id = ($1) AND created_at BETWEEN NOW() - INTERVAL '24 HOURS' AND NOW() ", [req.user.email]);
        rate = rate.rows[0].sum ? rate.rows[0].sum : 0;
        if(rate+text.length > process.env.DAILY_RATE_LIMIT){
            return res.status(402).json({ msg: "Crédit journalier épuisé" });
        }

        
        req.dailyrate = rate;
        next();
    }

}