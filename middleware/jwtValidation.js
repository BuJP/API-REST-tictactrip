const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = function(req, res, next) {
    // 1. Récuperation du token
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    // 2. test si le token est present
    if (!token) {
        return res.status(401).json({ msg: "Autorisation refusée" });
    }

    // 3. verifier l'authenticité du token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, email)=>{
        if(err){
            return res.status(401).json({ msg: "Token invalide" }); //non valide
        }
        req.user = email
        next();
    });
    
}