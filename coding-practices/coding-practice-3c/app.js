const express = require("express");
const app = express();
app.get("/", (request, respond) => {
  respond.send("Home Page");
});
app.get("/about", (request, respond) => {
  respond.send("About Page");
});

app.listen(3000, () => {
  console.log("3000 port is listening");
});

module.exports = app;
