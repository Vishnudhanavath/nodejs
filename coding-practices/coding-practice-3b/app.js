const express = require("express");
const app = express();
app.get("/gadgets",(request,respond)=> {
    respond.sendFile("/gadgets.html",{root:__dirname});
});

app.listen(3000,() => {
    console.log("port is listenig to 3000");
});
module.exports = app;