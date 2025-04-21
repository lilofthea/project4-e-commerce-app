const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

app.listen(3000, () => {
  console.log("Backend http://localhost:3000 adresinde çalışıyor");
});
