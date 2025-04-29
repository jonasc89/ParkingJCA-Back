import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { sequelize } from './config/database.js';
import userRoutes    from './routes/user.routes.js';
import parkingRoutes from './routes/parking.routes.js';
import authRoutes from './routes/auth.routes.js';
import errorHandler from './middlewares/error.middleware.js';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users',    userRoutes);
app.use('/api/parkings', parkingRoutes);

app.use(errorHandler);

sequelize.authenticate()
  .then(()=>console.log('🗄️  MySQL OK'))
  .catch(console.error);

export default app;
