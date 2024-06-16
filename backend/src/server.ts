import config from './config.json';
import express, { json } from 'express';
import cors from 'cors';

import { loadData } from './datastore';
import { authRegister } from './auth/auth';

const app = express();
app.use(json());
app.use(cors());

loadData();

const PORT = parseInt(process.env.PORT || config.port);
const HOST = process.env.IP || 'localhost';

// API Endpoints
app.post('/auth/register', (req, res) => {
  const { email, name, password } = req.body;
  res.json(authRegister(email, name, password));
})

const server = app.listen(PORT, HOST, () => {
  console.log(`⚡️ Server started on port ${PORT} at ${HOST}`);
});

process.on('SIGINT', () => {
  server.close(() => console.log('Shutting down server gracefully.'));
});
