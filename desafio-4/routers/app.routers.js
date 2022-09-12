const express = require("express");
const productsRoutes = require("./products/products.routes");

const router = express.Router();

router.use("/products", productsRoutes);

module.exports = router;
