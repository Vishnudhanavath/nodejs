const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const dbPath = path.join(__dirname, "goodreads.db");
let db = null;
const initializeDbAndserver = async () => {
  try {
    db = await open({
      filename: dbPath,
      //   driver: sqlite3.Datebase,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error  ${e.message}`);
    process.exit(1);
  }
};

initializeDbAndserver();

app.get("/books/", async (request, response) => {
  const getBookByQuery = `
        SELECT 
        * 
        FROM 
        book ORDER BY
         book_id;
    `;
  const booksArray = await db.all(getBookByQuery);
  response.send(booksArray);
});
