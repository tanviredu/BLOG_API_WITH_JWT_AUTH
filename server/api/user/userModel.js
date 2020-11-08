const mongoose = require("mongoose");
let Schema     = mongoose.Schema;
const bcrypt     = require("bcrypt"); // this is for hashing password

// make a user Schema
let userSchema = new Schema({
    username :{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required: true
    }
})

// applying pre hooks
// this will automatically execute when a object
// is being created that is hashing the password
// its like a constructor method
// cant use arrow function here
userSchema.pre("save",function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = this.encryptPassword(this.password);
    next();
})


// this method will be part of the
// object not the class
// that means when you create an object
// this will be method. not static method

userSchema.methods = {
    encryptPassword:function(plainTextPassword){
        if(!plainTextPassword){
            return ""
        }else{
            // gen the salt and then hash
            // why sync you must need the salt first
            let salt = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(plainTextPassword,salt);
        }
    },
    authenticate:function(plaintextpassword){
        // it will return a boolean
        // it will make the plaintextpassword hash
        // then this.password is already hashed so compare it
        return bcrypt.compareSync(plaintextpassword,this.password)
    },
    toJson:function(){
        let obj = this.toObject(); // convert it to object
        delete obj.password; // we dont need to show the hashed password
        return obj;
    }
}

module.exports = mongoose.model("user",userSchema)