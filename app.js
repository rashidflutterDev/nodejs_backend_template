const express = require("express");
require("dotenv/config");



const app = express();
const env = process.env;


// routes
app.get ("/", (req, res) => {
    res.send("Hello World");
})

// starting server
const port = env.PORT || 3000;
const host = env.HOST || '0.0.0.0';


app.listen(port, host,() => {
    console.log(`Server is running on port: ${port} and host: ${host}`);
})