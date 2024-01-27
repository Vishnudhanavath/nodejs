const express = require("express");
const app = express();
app.get("/", (request, respond) => {
  respond.send("Express JS");
});
app.listen(3000, () => {
  console.log("Listening On Port 3000");
});
module.exports = app;
