import express from 'express';
import {
    getGenreController, 
    getGenreMovieController,
    getMovieDetailController,
    getPopularMovieController, 
    getSearchMovieController 
    } from '../controllers/MovieController.js';
import connection from '../db.js';

const router = express.Router();

/* http://localhost:3000/movie/genre */
router.get("/genre", async (req, res) => {
    try {
        const results = await getGenreController();
        res.send(results);
    }
    catch (e) {
        console.log(e);
        res.status(500).send(`Interal Server Error: ${e}`);
    }
})

/* http://localhost:3000/movie/popular?page=1 */
router.get("/popular", async (req, res) => {
    try {
       const { page } = req.query;
       const results = await getPopularMovieController(page);
       res.send(results);
    }
    catch (e) {
        console.error(e);
        res.status(500).send(`Interal Server Error: ${e}`);
    }
})

/* http://localhost:3000/movie/search?query=king&page=1 */
router.get("/search", async (req, res) => {
    try {
        const { query, page } = req.query;
        const results = await getSearchMovieController(page, query);
        res.send(results);
    }
    catch (e) {
        console.error(e);
        res.status(500).send(`Interal Server Error: ${e}`);
    }
})

/* http://localhost:3000/movie/genre-filter?genre_id=28&page=1 */
router.get("/genre-filter", async (req, res) => {
    try {
        const { genre_id , page } = req.query;
        const results = await getGenreMovieController(genre_id, page);
        res.send(results);
    }
    catch (e) {
        console.error(e);
        res.status(500).send(`Interal Server Error: ${e}`);
    }
})

/* http://localhost:3000/movie/detail/335983 */
router.get("/detail/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const results = await getMovieDetailController(id);
        res.send(results);
    } catch (e) {
        console.error(e);
        res.status(500).send(`Internal Server Error: ${e}`);
    }
})

router.post("/insert-movie", async (req, res) => {
    const { id, title, path} = req.query;

  // Check if movieId already exists in the bookmarks table
  const checkQuery = 'SELECT COUNT(*) AS count FROM bookmarks WHERE movieId = ?';
  connection.query(checkQuery, id, (err, results) => {
    if (err) {
      console.error('Error checking movie:', err.stack);
      res.status(500).json({ error: 'Failed to check movie' });
      return;
    }

    if (results[0].count > 0) {
      res.status(200).json({ message: 'Movie already bookmarked' });
    } else {
      // Insert the movieId into the bookmarks table
      const insertQuery = 'INSERT INTO bookmarks (movieId, movieTitle, urlPath) VALUES (?, ?, ?)';
      connection.query(insertQuery, [id, title, path], (err, results) => {
        if (err) {
          console.error('Error inserting movie:', err.stack);
          res.status(500).json({ error: 'Failed to insert movie' });
          return;
        }
        res.status(200).json({ message: 'Movie inserted successfully', id: results.insertId });
      });
    }
    })
})

router.delete('/delete-movie/:id', (req, res) => {
    const movieId = req.params.id;
  
    const deleteQuery = 'DELETE FROM bookmarks WHERE movieId = ?';
    connection.query(deleteQuery, [movieId], (err, results) => {
        if (err) {
            console.error('Error deleting movie:', err.stack);
            res.status(500).json({ error: 'Failed to delete movie' });
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Movie not found' });
        } else {
            res.status(200).json({ message: 'Movie deleted successfully' });
        }
    });
});

export default router;