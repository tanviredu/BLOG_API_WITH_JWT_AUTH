let mongoose = require("mongoose");
var Schema   = mongoose.Schema;
var categorySchema = mongoose.Schema({
    name: {
        type:String,
        required: true,
        unique: true
    }
})

module.exports = mongoose.model("category",categorySchema);