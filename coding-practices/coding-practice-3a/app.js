const addDays = require("date-fns/addDays");
function date(d) {
  const newdate = addDays(new Date(2024, 0, 25), d);
  const DD = newdate.getDate();
  const MM = newdate.getMonth() + 1;
  const YY = newdate.getFullYear();
  return `${DD}/${MM}/${YY}`;
}
// console.log(date(100));

const express = require("express");
const app = express();
app.get("/", (require, respond) => {
  respond.send(date(100));
});

app.listen(3000);
module.exports = app;
