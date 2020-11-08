var router      = require("express").Router();
var controller  = require("./postController");
var createRoute = require("../../util/createRoute");
var auth        = require("../../auth/auth")

var checkUser = [auth.decodetoken(),auth.getusername()];
// setup boilerplate route jsut to satisfy a request
// for building
router.param('id', controller.params);

router.route('/')
    .get(controller.get)
    .post(checkUser ,controller.post)

router.route('/:id')
    .get(controller.getOne)
    .put(checkUser, controller.put)
    .delete(checkUser, controller.delete)


module.exports = router;
