const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


const products = [
  {
    id: 1,
    name: 'Bamboo Watch',
    category: 'Accessories',
    image: 'bamboo-watch.jpg',
    price: 65,
    inventoryStatus: 'INSTOCK',
    rating: 5
  },
  {
    id: 2,
    name: 'Black Watch',
    category: 'Accessories',
    image: 'black-watch.jpg',
    price: 72,
    inventoryStatus: 'OUTOFSTOCK',
    rating: 4
  }
]

app.get('/api/products', (req, res) => {
  res.json(products);
});


app.listen(3000, () => {
  console.log('Backend http://localhost:3000 adresinde çalışıyor');
});
