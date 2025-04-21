const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("ecommerce.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    category TEXT,
    image TEXT,
    price REAL,
    inventoryStatus TEXT,
    rating INTEGER
  )`);
});

module.exports = db;
