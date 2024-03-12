const sqlite3 = require('sqlite3').verbose();

// Create a new database instance
const db = new sqlite3.Database('./db/database.sqlite');

// Create jokes table
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS jokes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT,
        joke TEXT,
        like_count INTEGER DEFAULT 0,
        dislike_count INTEGER DEFAULT 0
    )`);
});

// Close the database connection
db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('Database created successfully.');
    }
});
