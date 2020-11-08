let controller  = require("./userController");
//let createRoute = require("../../util/createRoute")
let router  = require("express").Router();
var auth = require("../../auth/auth");
var checkUser = [auth.decodetoken(),auth.getusername()]
router.param("id",controller.params);
router.get("/me",checkUser,controller.me); // need to be a user
router.route('/')
    .get(controller.get) // get all the user no restriction
    .post(controller.post) // signup no restriction

router.route('/:id')
    .get(controller.getOne) // get one user no restriction
    .put(checkUser, controller.put) // edit user restriction
    .delete(checkUser, controller.delete) // delete restricion

module.exports = router;