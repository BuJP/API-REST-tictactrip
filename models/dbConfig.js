const Pool= require("pg").Pool;
require('dotenv').config();
const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE}`;


const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: isProduction ? false :{
        rejectUnauthorized: false,
    },
});
module.exports = pool;