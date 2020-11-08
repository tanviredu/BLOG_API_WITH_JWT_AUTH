let Category = require("./categoryModel");
let _        = require("lodash");

// it will detect the parameter attached
// to it and then it will take the parameter
// do calculation
// consider this is a helper operation
// to optimize the code
exports.params = function(req,res,next,id){
    Category.findById(id)
        .then((category)=>{
            if(!category){
                next(new Error("No Category found"));
            }else{
                req.category = category
                next();
            }
        },(err)=>{
            next(err);
        })
}

exports.get = function(req,res,next){
    Category.find({})
        .then((categories)=>{
            res.json(categories)
        },(err)=>{
            next(err);
        })
}

exports.getOne = function(req,res,next){
    // already have the category
    // with the help of param
    let category = req.category;
    res.json(category);
}

exports.put = function(req,res,next){
    let category = req.category;
    let update   = req.body;
    _.merge(category,update);

    // when you do this way this
    // category the callback have some error
    // and the saved object
    category.save((err,saved)=>{
        if(err){
            next(err)
        }else{
            res.json(saved);
        }
    })
}

exports.post = function(req,res,next){
    let newCategory = req.body;
    Category.create(newCategory)
        .then((category)=>{
            res.json(category)
        },(err)=>{
            next(err);
            }
        )
}

exports.delete = function(req,res,next){
    req.category.remove((err,removed)=>{
        if(err){
            next(err)
        }else{
            res.json(removed);
        }
    })
}