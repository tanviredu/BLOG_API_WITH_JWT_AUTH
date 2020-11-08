let router         = require("express").Router();
let userRouter     = require("./user/userRouter");
let categoryRouter = require("./category/categoryRouter");
let postRouter     = require("./post/postRoute");
// you need to export the user router
router.use("/users",userRouter);
router.use("/categories",categoryRouter);
router.use("/posts",postRouter);

// in order to import it you have to export it
module.exports = router;

