const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
const dbPath = path.join(__dirname, "goodreads.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

// Get Books API
app.get("/books/", async (request, response) => {
  const getBooksQuery = `
    SELECT
      *
    FROM
      book
    ORDER BY
      book_id;`;
  const booksArray = await db.all(getBooksQuery);
  response.send(booksArray);
});

//Get Book API
app.get("/books/:bookId/", async (request, response) => {
  const { bookId } = request.params;
  const bookQuery = `
        SELECT 
         * 
        FROM book
        WHERE book_id = ${bookId};
    `;
  const book = await db.get(bookQuery);
  response.send(book);
});

app.use(express.json());

// add BOOK API
app.post("/books/", async (require, response) => {
  const bookDetails = require.body;
  const {
    title,
    authorId,
    rating,
    ratingCount,
    reviewCount,
    description,
    pages,
    dateOfPublication,
    editionLanguage,
    price,
    onlineStores,
  } = bookDetails;
  const addBookDetails = `
    INSERT 
    INTO book (title,author_id,rating,rating_count,review_count,description,pages,date_of_publication,edition_language,price,online_stores)
    VALUES
        (
        '${title}',
         ${authorId},
         ${rating},
         ${ratingCount},
         ${reviewCount},
        '${description}',
         ${pages},
        '${dateOfPublication}',
        '${editionLanguage}',
         ${price},
        '${onlineStores}'
      );`;
  const books = await db.run(addBookDetails);
  //   console.log(book);
  const bookId = books.lastID;
  //   console.log(bookId);
  response.send({ bookId: bookId });
});

// update BOOK API
app.put("/books/:bookId/", async (require, response) => {
  const { bookId } = require.params;
  const bookDetails = require.body;
  const {
    title,
    authorId,
    rating,
    ratingCount,
    reviewCount,
    description,
    pages,
    dateOfPublication,
    editionLanguage,
    price,
    onlineStores,
  } = bookDetails;
  const updateDetailsQuery = `
    UPDATE book 
    SET 
      title='${title}',
      author_id=${authorId},
      rating=${rating},
      rating_count=${ratingCount},
      review_count=${reviewCount},
      description='${description}',
      pages=${pages},
      date_of_publication='${dateOfPublication}',
      edition_language='${editionLanguage}',
      price=${price},
      online_stores='${onlineStores}'
      WHERE book_id = ${bookId};
  `;
  await db.run(updateDetailsQuery);
  response.send("book details are updated successfully");
});

// delete book API
app.delete("/books/:bookId/", async (require, response) => {
  const { bookId } = require.params;
  const deleteBookQuery = `
        DELETE FROM 
        book 
        where book_id = ${bookId};
    `;
  await db.run(deleteBookQuery);
  response.send("book details is delete successfully");
});

// get author API
app.get("/authors/:authorId/books/", async (request, response) => {
  const { authorId } = request.params;
  const getAuthorDetailsQuery = `
        SELECT * 
        FROM author
        where author_id = ${authorId};
    `;
  const booksList = await db.all(getAuthorDetailsQuery);
  response.send(booksList);
});
