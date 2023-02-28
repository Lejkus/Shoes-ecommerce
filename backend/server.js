import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/db.js'
import cors from 'cors';
import productsRouter from './routes/productRoute.js'
import userRouter from './routes/userRoute.js'

const app = express();

dotenv.config()

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRouter)
app.use('/api/user', userRouter)

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
