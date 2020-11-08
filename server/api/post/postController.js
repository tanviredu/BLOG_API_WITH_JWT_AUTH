var Post = require("./postModel");
var _    = require("lodash");


// take the post with the author
// data also
exports.params = function(req,res,next,id){
    Post.findById(id)
        .populate('author')
        .populate("categories")
        .exec()
        .then((post)=>{
            if(!post){
                next(new Error("No Post with that id"))
            }else{
                req.post = post;
                next();
            }
        },(err)=>{
            next(err);
        })
}

exports.get = function (req,res,next){
    Post.find({})
        .populate('author')
        .populate("categories")
        .exec()
        .then((posts)=>{
            res.json(posts);
        },(err)=>{
            next(err);
        });
};

exports.getOne = function(req,res,next){
    var post = req.post;
    res.json(post);
};

exports.post = function(req,res,next){
    let newPost = req.body;
    Post.create(newPost)
        .then((post)=>{
            res.json(post);
        },(err)=>{
            next(err);
        })
}


exports.put = function(req,res,next){
    let post = req.post;
    let update = req.body;
    _.merge(post,update);
    post.save((err,saved)=>{
        if(err){
            next(err);
        }else{
            res.json(saved);
        }
    })

}


exports.delete = function(req,res,next){
    req.post.remove((err,removed)=>{
        if(err){
            next(err);
        }else{
            res.json(removed);
        }
    })
}

/* testwith this
* {
    "title":"Mu API",
    "text" : "THis is a Node Project",
    "author": "5fa700cc3419602504481e9f",
    "categories": ["5fa6f336b311ee31cc242135","5fa6f33fb311ee31cc242136"]
}
* */