import express from 'express';

const app = express();

app.use(express.json());

import indexRoutes from './routes/index';
app.use("/",indexRoutes);
export default app;