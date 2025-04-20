const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


const products = [
  { id: 1, name: 'Laptop', price: 15000 },
  { id: 2, name: 'Telefon', price: 8000 },
  { id: 3, name: 'Kulaklık', price: 1200 }
];

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', (req, res) => {
    const { name, price } = req.body;
  
    if (!name || !price) {
      return res.status(400).json({ error: 'Name ve price zorunlu.' });
    }
  
    const newProduct = {
      id: products.length + 1,
      name,
      price
    };
  
    products.push(newProduct);
  
    res.status(201).json(newProduct);
  });

app.listen(3000, () => {
  console.log('Backend http://localhost:3000 adresinde çalışıyor');
});
