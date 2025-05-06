// seed-postgres.js
const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: false,
  },
});

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

async function seed() {
  try {
    await client.connect();

    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT,
        category TEXT,
        image TEXT,
        price REAL,
        inventoryStatus TEXT,
        rating INTEGER
      )
    `);

    for (const p of products) {
      await client.query(
        `INSERT INTO products (name, category, image, price, inventoryStatus, rating)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [p.name, p.category, p.image, p.price, p.inventoryStatus, p.rating]
      );
    }

    console.log("Veriler başarıyla yüklendi.");
  } catch (err) {
    console.error("Hata:", err);
  } finally {
    await client.end();
  }
}

seed();
