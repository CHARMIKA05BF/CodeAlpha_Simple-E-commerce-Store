const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const filePath = path.join(__dirname, "../data/products.json");

function readProducts() {
  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

router.get("/", (req, res) => {
  try {
    const products = readProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to load products" });
  }
});

router.get("/:id", (req, res) => {
  try {
    const products = readProducts();
    const product = products.find((p) => p.id === Number(req.params.id));

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to load product" });
  }
});

module.exports = router;