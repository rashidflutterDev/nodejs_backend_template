const bodyParser = require("body-parser");
const express = require("express");
require("dotenv/config");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const env = process.env;
const API = env.API_URL;

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());

// routes
 const authRouter = require("./routes/auth");
 app.use(`${API}/`, authRouter);

// starting server
const port = env.PORT || 3000;
const host = env.HOST || '0.0.0.0';

// connecting to db
mongoose.connect(env.MONGODB_CONNECTION_STRING).then(() => {
    console.log("Connected to db");
}).catch((err) => {
    console.log(err);
});

app.listen(port, host,() => {
    console.log(`Server is running on port: ${port} and host: ${host}`);
});