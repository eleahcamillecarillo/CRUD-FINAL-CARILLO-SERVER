//import module/file
const express = require('express');
const app = express();
const users = require('./users.json');
const {success, error} = require('./utils/response')

//Routes
app.get('/api/users', (req, res) => {
   // res.json(users);
 try {
    return success(res, users, "Users Retreived Successfully")
 }  catch (err)
 {
 return error(res, "Failed to fetch users", 500);
 }
})

//start server
app.listen(3000, () => {
console.log("Server is running on http://localhost:3000/api/users");
})
