import 'dotenv/config';
import app from './app.js';

app.listen(process.env.PORT,
  () => console.log(`🚀 API en ${process.env.DB_HOST}:${process.env.PORT}`));
