import 'dotenv/config';
import app from './app.js';

app.listen(process.env.API_PORT || 4000,
  () => console.log(`🚀 API en ${process.env.DB_HOST}:${process.env.API_PORT || 4000}`));
