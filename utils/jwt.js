const jwt = require("jsonwebtoken");
require('dotenv').config();



module.exports =  {
    generateToken: function(user_email){
        const payload = {
            email: user_email,
        }
    
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1hr'})
    },
}