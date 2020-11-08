// this is a cloud hosted
// mongodb database url for testing
// expire time is 10 days in munites
module.exports = {
    "mongourl" : "mongodb+srv://trahman123456:trahman123456@cluster0.v1x5w.mongodb.net/todo?retryWrites=true&w=majority",
    "port": process.env.PORT || 3000,
    "secrets": process.env.JWT || "secret",
    "expiretime":24*60*10
}