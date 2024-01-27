// const addDays = require("date-fns/addDays");

// function days(d) {
//   const date = addDays(new Date(2020, 7, 22), d);

//   console.log(
//     `${date.getDate()} - ${date.getMonth() + 1}  - ${date.getFullYear()}`
//   );
// }
// day(2);

const addDays = require("date-fns/addDays");
const getDateAfterXDays = (days) => {
  const newdate = addDays(new Date(2020, 7, 22), days);
  return `${newdate.getDate()}-${
    newdate.getMonth() + 1
  }-${newdate.getFullYear()}`;
};

module.exports = getDateAfterXDays;
