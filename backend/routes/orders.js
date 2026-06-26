const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const filePath = path.join(__dirname, "../data/orders.json");

router.post("/", (req, res) => {

  const orders = JSON.parse(
    fs.readFileSync(filePath)
  );

  orders.push(req.body);

  fs.writeFileSync(
    filePath,
    JSON.stringify(orders, null, 2)
  );

  res.json({
    message: "Order Placed Successfully"
  });
});

module.exports = router;