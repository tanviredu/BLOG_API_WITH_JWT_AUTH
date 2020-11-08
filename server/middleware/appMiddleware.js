const bodyParser = require("body-parser");
const morgan     = require("morgan");

// return a function that will take a parameter
module.exports = function(app){
    app.use(morgan("dev"));
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json());
}