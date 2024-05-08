import config from './config.json' assert { type: "json" };
import express, { json } from 'express';
import cors from 'cors';

import { loadData } from './datastore';

const app = express();
app.use(json());
app.use(cors());

loadData();

const PORT = parseInt(process.env.PORT || config.port);
const HOST = process.env.IP || 'localhost';

// API Endpoints 
app.get('/data', (req, res) => {
  res.json(['Example 1', 'Example 2'])
})

const server = app.listen(PORT, HOST, () => {
  console.log(`⚡️ Server started on port ${PORT} at ${HOST}`);
});

process.on('SIGINT', () => {
  server.close(() => console.log('Shutting down server gracefully.'));
});
