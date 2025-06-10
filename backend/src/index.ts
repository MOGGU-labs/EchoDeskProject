import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import clientRoutes from './routes/clientRoute';
import folderRoutes from './routes/folderRoute';
dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from EchoDesk backend!');
});

app.use('/clients', clientRoutes);

app.use('/folders', folderRoutes);




const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
