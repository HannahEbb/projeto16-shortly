import dotenv from 'dotenv';
import express, { json } from 'express';
import cors from 'cors';

dotenv.config();

import router from './routes/index.js';

const app = express();

app.use(cors());
app.use(json());

app.use(router);

const PORT = process.env.PORT || 5009;

app.listen(PORT, () => console.log(`Servidor rodando OK na porta ${PORT}`));