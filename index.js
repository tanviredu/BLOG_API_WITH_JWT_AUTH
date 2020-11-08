let config = require("./server/config/config");
let app    = require("./server/server");

app.listen(config.port,()=>{
    console.log("Server Started");
});