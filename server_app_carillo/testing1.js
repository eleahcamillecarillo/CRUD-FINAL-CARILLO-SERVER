//import module/file
const express = require('express');
const app = express();

//Routes
app.get('/', (req, res) => {
    res.send("Welcome to Express js World.");
})

//start server
app.listen(3000, () => {
console.log("Server is running on http://localhost:3000");
})
