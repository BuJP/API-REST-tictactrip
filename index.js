const express = require('express');
const pool = require("./models/dbConfig");
const jwt = require("jsonwebtoken");
const app = express();


app.use(express.json());

// --------------- ROUTES ---------------

//Register and login routes
app.use("/", require("./routes/Auth"));


app.listen(5500 , ()=>console.log('Server started : 5500'));