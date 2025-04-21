const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("ecommerce.db");

const products = [
  {
    name: "Bamboo Watch",
    category: "Accessories",
    image: "bamboo-watch.jpg",
    price: 65,
    inventoryStatus: "INSTOCK",
    rating: 5,
  },
  {
    name: "Black Watch",
    category: "Accessories",
    image: "black-watch.jpg",
    price: 72,
    inventoryStatus: "OUTOFSTOCK",
    rating: 4,
  },
  {
    name: "Blue T-Shirt",
    category: "Clothing",
    image: "blue-t-shirt.jpg",
    price: 35,
    inventoryStatus: "LOWSTOCK",
    rating: 3,
  },
];

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

  const stmt = db.prepare(
    `INSERT INTO products (name, category, image, price, inventoryStatus, rating) VALUES (?, ?, ?, ?, ?, ?)`
  );

  products.forEach((product) => {
    stmt.run(
      product.name,
      product.category,
      product.image,
      product.price,
      product.inventoryStatus,
      product.rating
    );
  });

  stmt.finalize();
});

db.close(() => {
  console.log("Veritabanına örnek veriler başarıyla eklendi!");
});
