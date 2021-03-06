module.exports = function(req, res, next){
    const {email} = req.body;

    function validateEmail(email){
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }
    // 1. verifier si l'email est present
    if(!email){
        return res.status(400).json({ msg: "Email manquant" });
    } // 2. verifier que le format de l'email est valide
    else if(!validateEmail(email)){
        return res.status(400).json({ msg: "Format de l'email invalide" });
    }    
    
    next();
};