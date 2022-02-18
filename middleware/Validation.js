module.exports = function(req, res, next){
    const {email} = req.body;

    function validateEmail(email){
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    if(req.path === "/instription" || req.path === "/connexion"){
        if(!email){
            return res.status(401).json({ msg: "Email manquant" });
        }
        else if(!validateEmail(email)){
            return res.status(400).json({ msg: "Format de l'email invalide" });
        }

    }
    next();
};