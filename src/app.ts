import express from 'express';
import knexConfig from './config/knex.config';
import { connectAllDB, getConnection } from './connectionManager';
import * as connectionResolver from './middlewares/connectionResolver';

const app = express();
app.use(express.json());

connectAllDB();

app.use(connectionResolver.resolve);

app.get('/users', async (req, res, next) => {
  try {
    const data = await getConnection().select('*').from('users');
    res.status(200).json({ data });
  } catch (error) {
    throw error;
  }
});

export default app;
