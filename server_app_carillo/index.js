const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// require("./config/db");

// console.log("App started...");

//API Versioning
app.use("/api/v1", productRoutes);

app.use("/", (req, res) => {
    res.send("API Running...");
});

const PORT = process.env.PORT || 3300;
app.listen(PORT, () => {
console.log(`Server is running on http://localhost:${PORT}`);
});
