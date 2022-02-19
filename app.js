const express = require('express');
const app = express();


app.use(express.json());
app.use(express.text());

// --------------- ROUTES ---------------

//Register and login routes
app.use("/api", require("./routes/Auth"));


// Text
app.use("/api", require("./routes/Text"));


module.exports = app;