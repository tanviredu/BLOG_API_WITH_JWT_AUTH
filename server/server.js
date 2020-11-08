const express  = require("express");
const mongoose = require("mongoose");
const config   = require("./config/config")
const api      = require("./api/api");
const auth     = require("./auth/routes")
const app      = express();
require("./middleware/appMiddleware")(app)
app.use("/api",api);
app.use("/auth",auth);
mongoose.connect(config.mongourl);

// make a global error handling function
// this function take an extra argument called err
// thats a special function
// this is a special function
// with 4 argument

app.use(function(err,req,res,next){
    if(err.name === "UnauthorizedError"){
        res.status(401).send("Invalid Token");
        return;
    }
    res.status(500).send("someProblem accur");
})

// you can expose this app even after the server is running
module.exports = app;