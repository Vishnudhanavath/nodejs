const express = require("express");
const app = express();
app.get("/", (require, respond) => {
  const date = new Date();
  let dd = date.getDate();
  let MM = date.getMonth() + 1;
  let YY = date.getFullYear();
  respond.send(`${dd}-${MM}-${YY}`);
  //   respond.send(date);
});
app.listen(3000);
module.exports = app;
