import express from 'express';
import cors from 'cors';
import productRoutes from './routes/products.js';
import { initialize } from './data/database.js';

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products",productRoutes);

try{
  await initialize();
  app.listen(PORT, () => {
    console.log(`Server is run on ${PORT}`);
  });
}catch(err){
  console.log(err.message);
}