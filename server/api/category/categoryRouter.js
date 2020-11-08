let router       = require("express").Router();
let controller   = require("./categoryController");
let createRoutes = require("../../util/createRoute");
let auth         = require("../../auth/auth")

let checkUser = [auth.decodetoken(),auth.getusername()];
router.param('id', controller.params);

router.route('/')
    .get(controller.get)
    .post(checkUser ,controller.post)

router.route('/:id')
    .get(controller.getOne)
    .put(checkUser, controller.put)
    .delete(checkUser, controller.delete)

module.exports = router;