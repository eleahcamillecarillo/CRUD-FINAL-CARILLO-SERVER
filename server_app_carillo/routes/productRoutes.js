const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");

// GET all products
router.get("/products", productController.index);

// GET single product
router.get("/products/:id", productController.show);

// CREATE product
router.post("/products", productController.create);

// UPDATE product (full update)
router.put("/products/:id", productController.update);

// PATCH product (partial update)
router.patch("/products/:id", productController.update);

// DELETE product
router.delete("/products/:id", productController.destroy);

module.exports = router;
