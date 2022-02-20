const pool = require("../models/dbConfig");


module.exports.getUser = async function (user_id){
    return await pool.query('SELECT * FROM users WHERE email = ($1)',[user_id]);
}


module.exports.registerUser = async function (user_id){
    return await pool.query(
        "INSERT INTO users (email) VALUES ($1) RETURNING *", [user_id]
    );
}

module.exports.deleteUser = async function (user_id){
    return await pool.query('DELETE FROM users WHERE email = $1 ', [user_id]);
}