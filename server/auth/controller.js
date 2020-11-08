const User = require("../api/user/userModel");
var createToken = require("./auth").createToken;

exports.signIn = function(req,res,next){
    var token = createToken(req.user._id);
    res.json({token:token});
}