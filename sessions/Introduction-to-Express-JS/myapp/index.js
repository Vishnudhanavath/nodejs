const express = require("express");
const app = express();
app.get("/page", (request, respond) => {
  // const date = new Date();
  respond.sendFile("./page.html", { root: __dirname });
});

app.listen(3000);
