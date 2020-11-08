// exporting the function
// remember this is a function
// it will take the router object and then
// it will attach this routers route with the
// controller
module.exports = function (controller,router){
    // remember the sequence is important
    // it will get the route and assign the controller
    // each router is the router app of the app
    // and the controller is the function that execute when
    // the url called
    router.param('id',controller.params); // this will create a object assigning with the id

    router.route("/")
        .get(controller.get)
        .post(controller.post)

    router.route("/:id")
        .get(controller.getOne)
        .put(controller.put)
        .delete(controller.delete)
}