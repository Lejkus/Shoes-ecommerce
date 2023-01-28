require("express-async-errors");
require("dotenv").config();
const cors = require("cors");
const express = require('express')
const connectDB = require("./db/db");
const app = express();
const productsRouter = require('./routes/productRoute');

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter)

const port = process.env.PORT;

const start = async () => {
  try {
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
    connectDB()
  } catch (error) {
    console.log(error);
  }
};

start();
