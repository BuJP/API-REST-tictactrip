const pool = require("../models/dbConfig");

module.exports.getAllJustifiedTextFromUser = async function (user_id){
    return await pool.query(
        "SELECT id, text, created_at, length FROM justified_text WHERE user_id = $1 ORDER BY created_at DESC", [user_id]
    );
}

module.exports.addJustifiedText = async function(user_id, text, length){
    return await pool.query(
        "INSERT INTO justified_text(user_id, text, created_at, length) VALUES ( $1, $2, now(), $3)", [user_id, text,length]
    );
}

module.exports.getDailyRateUsedFromUser = async function(user_id){
    return await pool.query("select sum(length) from justified_text where user_id = ($1) AND created_at BETWEEN NOW() - INTERVAL '24 HOURS' AND NOW() ", [user_id]);
}


/* UTILISE DANS LES TESTS */
module.exports.deleteAllJustifiedTextFromUser = async function(user_id){
    return await pool.query('DELETE FROM justified_text WHERE user_id = $1 ', [user_id]);
}

module.exports.setDailyRateToMax = async function(user_id, maxRate){
    return await pool.query('UPDATE justified_text SET length= $1 WHERE user_id = $2 RETURNING length' , [ maxRate ,user_id]);
}