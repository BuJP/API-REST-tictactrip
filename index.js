const express = require('express');
const pool = require("./models/dbConfig");
const app = express();


app.use(express.json());
app.use(express.text());

// --------------- ROUTES ---------------

//Register and login routes
app.use("/api", require("./routes/Auth"));


// Text
app.use("/api", require("./routes/Text"));

app.listen(5500 , ()=>console.log('Server started : 5500'));