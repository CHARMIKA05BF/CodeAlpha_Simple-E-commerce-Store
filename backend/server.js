const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const orderRoutes = require("./routes/orders");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/orders", orderRoutes);

app.use(express.static(path.join(simple-ecommerce-store, "../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(simple-ecommerce-store, "../frontend/index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
