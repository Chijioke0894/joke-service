const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000; // Use port from environment variable or default to 3000

const db = new sqlite3.Database('./db/database.sqlite');

// Middleware to parse JSON bodies
app.use(express.json());

// Retrieve a random joke from all jokes in the database
app.get('/jokes/random', (req, res) => {
    db.get('SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1', (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(row);
        }
    });
});

// Retrieve a random joke from a category of jokes
app.get('/jokes/random/:category', (req, res) => {
    const category = req.params.category;
    db.get('SELECT * FROM jokes WHERE category = ? ORDER BY RANDOM() LIMIT 1', [category], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(row);
        }
    });
});

// Retrieve a list of categories
app.get('/categories', (req, res) => {
    db.all('SELECT DISTINCT category FROM jokes', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            const categories = rows.map(row => row.category);
            res.json(categories);
        }
    });
});

// Retrieve all jokes for a category
app.get('/jokes/:category', (req, res) => {
    const category = req.params.category;
    db.all('SELECT * FROM jokes WHERE category = ?', [category], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(rows);
        }
    });
});

// Retrieve a joke by id
app.get('/jokes/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM jokes WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else if (!row) {
            res.status(404).json({ error: 'Joke not found' });
        } else {
            res.json(row);
        }
    });
});

// Add a new category of jokes
app.post('/categories', (req, res) => {
    const { category } = req.body;
    if (!category) {
        res.status(400).json({ error: 'Category name is required' });
    } else {
        db.run('INSERT INTO jokes (category) VALUES (?)', [category], function (err) {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.json({ message: 'Category added successfully', id: this.lastID });
            }
        });
    }
});

// Add a new joke to a category
app.post('/jokes', (req, res) => {
    const { category, joke } = req.body;
    if (!category || !joke) {
        res.status(400).json({ error: 'Category and joke text are required' });
    } else {
        db.run('INSERT INTO jokes (category, joke) VALUES (?, ?)', [category, joke], function (err) {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.json({ message: 'Joke added successfully', id: this.lastID });
            }
        });
    }
});

// Add an existing joke to a category by joke id
app.put('/jokes/:id/category', (req, res) => {
    const { id } = req.params;
    const { category } = req.body;
    if (!category) {
        res.status(400).json({ error: 'Category is required' });
    } else {
        db.run('UPDATE jokes SET category = ? WHERE id = ?', [category, id], function (err) {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.json({ message: `Joke ${id} updated with category ${category}` });
            }
        });
    }
});

// Give a joke (by id) a vote of like or dislike
app.put('/jokes/:id/vote', (req, res) => {
    const { id } = req.params;
    const { vote } = req.body;
    if (vote !== 'like' && vote !== 'dislike') {
        res.status(400).json({ error: 'Vote must be either "like" or "dislike"' });
    } else {
        db.run(`UPDATE jokes SET ${vote}_count = ${vote}_count + 1 WHERE id = ?`, [id], function (err) {
            if (err) {
                console.error(err.message);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.json({ message: `Vote recorded for joke ${id}` });
            }
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
