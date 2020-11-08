let mongoose = require("mongoose");
let User = require("./userModel");
let createToken = require("../../auth/auth").createToken;
let _    = require("lodash");


// if it gets the user id
exports.params = function(req,res,next,id){
    User.findById(id)
        .select("-password") // everything except password
        .exec()
        .then((user)=>{
            // why double check ? because if anybody know your secret key
            // they can creat a valid json token but this token user may not exit
            if(!user){
                next(new Error("User dont exist in this id"))
            }else {
                req.user = user;
                next();
            }
        },(err)=>{
            next(err);
        })
}

// get all the user
exports.get = (req,res,next)=>{
    User.find({})
        .select("-password")
        .exec()
        .then((users)=>{
            res.json(users)
        },(err)=>{
            next(err);
        })
}

// get one user with the id
exports.getOne = (req,res,next)=>{
    // the id is handled with the
    // params so we fetch the user with the req.user
    let user = req.user.toJson(); // convert it to pure json
    res.json(user)
};

// update the user
exports.put = (req,res,next)=>{
    // put already has a id
    // so we have the user
    let user = req.user; // this is a document of mongodb so we can save it
    let update = req.body;
    _.merge(user,update); // replace the user
    user.save((err,saved)=>{
        if(err){
            next(err); // pass the error
        }else {
            res.json(saved); // return the response
        }
    })
};

// POST will be done here
// this is actually the signup fucntion
// the exports.POST
//---------------------------------
// this is signup
exports.post = function (req,res,next){
    var newUser = new User(req.body);
    newUser.save((err,user)=>{
        if(err){
            return next(err) // return it because if the user cant create then
            // no id no token
        }
        var token = createToken(user._id);
        res.json({token:token})
    })
}



//--------------------

exports.delete = function(req,res,next){
    // already have an id
    req.user.remove((err,removed)=>{
        if(err){
            next(err);
        }else{
            res.json(removed)
        }
    })
}

exports.me = function(req,res){
    res.json(req.user.toJson());
}