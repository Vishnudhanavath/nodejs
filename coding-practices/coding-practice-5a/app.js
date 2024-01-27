const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());

dbPath = path.join(__dirname, "moviesData.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3002, () => {
      console.log("server running http://localhost:3002");
    });
  } catch (e) {
    console.log(`DB Error ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

//API-1

app.get("/movies/", async (request, response) => {
  const getMoviesQuery = `
        SELECT movie_name FROM movie;
    `;
  const getMoviesNames = await db.all(getMoviesQuery);
  response.send(getMoviesNames);
});

//API-2
app.post("/movies/", async (request, response) => {
  const { directorId, movieName, leadActor } = request.body;
  const addMovieQuery = `
        INSERT
         INTO 
         movie(director_id,movie_name,lead_actor)
         VALUES(
             ${directorId},
             '${movieName}',
             '${leadActor}'
         );

    `;
  const dbResponse = await db.run(addMovieQuery);
  console.log(dbResponse);
  response.send("Movie Successfully Added");
});

//API-3
app.get("movies/:movieId/", async (request, response) => {
  const { movieId } = request.params;
  const getMovieQuery = `
        SELECT 
        * 
        FROM 
        movie WHERE  movie_id = ${movieId};
    `;
  const dbResponse = await db.get(getMovieQuery);
  console.log(dbResponse);
  response.send(dbResponse);
});

//API - 4
app.put("/movies/:movieId/", async (request, response) => {
  const movieId = request.params;
  const movieDetails = request.body;
  const { directorId, movieName, leadActor } = movieDetails;
  const updateMovieQuery = `
        UPDATE movie SET(
            director_id = ${directorId},
            movie_name = '${movieName}',
            lead_actor = '${leadActor}'
        )
        WHERE movie_id = ${movieId};
    `;
  await db.run(updateMovieQuery);
  response.send("Movie Details Updated");
});
module.exports = app;
