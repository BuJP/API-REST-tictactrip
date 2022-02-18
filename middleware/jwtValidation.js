const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = function(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ msg: "Autorisation refusée" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, email)=>{
        if(err){
            return res.status(401).json({ msg: "Token invalide" }); //non valide
        }
        req.user = email
        next();
    });
    
}