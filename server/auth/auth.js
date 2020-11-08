let jwt        = require("jsonwebtoken");
let expressjwt = require("express-jwt");
let config     = require("../config/config")
let User       = require("../api/user/userModel");
// this check_token is a function return next or error
// to return next() we need to write a clousre
let checktoken = expressjwt({secret:config.secrets,algorithms: ['sha1', 'RS256', 'HS256'],})


// find the id from the token


//---------------------------------------------------------------------------
// IMPORTANT FUNCTION
exports.decodetoken = function(){
    // first take the token from the req.query.acces_token
    // and then attached it to the req.headers.authorization
    // then decode it with checktoken if it passes then it autometically
    // call the next otherwise throw an error
    // why we use the functioninside a function
    // because if we set the req,res,next in the pparent function
    // we need to provide it req but it already exists
    // req.query req.headers so decode is a function that take
    // no parameter but the inside function take req whcih you donthave to be
    // provide it will come from the client

    return function(req,res,next){
        if (req.query && req.query.hasOwnProperty("access_token")){
            req.headers.authorization = "Bearer "+req.query.access_token;
            console.log(req.headers.authorization);
        }
        // go to the post man authrorization and OAuth2 then
        // fill the acess token and bearer
        checktoken(req,res,next);
        // if it pass you will get the user in the
        //WITH ONLY THE ID PROPERTY
        // TO GET THE USERNAME YOU NEED TO SEARCH DATABASE with the id
    }

}

// find the username from the id
// just get the username
// it will give access to resource based on the id that is decoded
// be the decode token
// so when you go to the protected route
// you need to go through the decode token and the getusername when it
// find then it will give access to protected route

exports.getusername = function(){
    return function(req,res,next){
        User.findById(req.user._id)
            .then((user)=>{
                if(!user){
                    res.status(401).send("unauthorized")
                }else{
                    req.user = user // this is redundant most of the time
                    next();
                }
            },(err)=>{
                next(err)
            })
    }
}
//-----------------------------------------------------------------------

// you can execute a function without any parameter
// and this function will retun another function
// that take the req which is already there
// thats why function inside a function
// because the req will be available then
// need no parameter to execute
// MOST IMPORTANT FUNCTION
// Used For SIGNIN
exports.verifyUser = function(){
    return function(req,res,next){
        var username = req.body.username;
        var password = req.body.password;
        if(!username || !password){
            res.status(400).send("need username and password")
            return;
        }
        User.findOne({username:username})
            .then((user)=>{
                if(!user){
                    res.status(401).send("NO user")
                }else{
                    if(!user.authenticate(password)){
                        res.status(401).send("wrong password");
                    }else{
                        req.user = user;
                        next();
                    }
                }
            },(err)=>{
                next(err);
            })
    }
}

exports.createToken = function(id){
    return jwt.sign({_id:id},config.secrets,);
}