import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { createDatabaseIfNotExists } from './utils/initDatabase.js';
import { runMigrations } from './utils/runMigrations.js';
import { runSeeders } from './utils/runSeeders.js';
import { sequelize } from './config/database.js';
import userRoutes    from './routes/user.routes.js';
import parkingRoutes from './routes/parking.routes.js';
import authRoutes from './routes/auth.routes.js';
import registerPersonalRoutes from './routes/registerpersonal.routes.js';
import errorHandler from './middlewares/error.middleware.js';




const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// ————— Inicia la DB y migraciones —————
(async () => {
  try {
    // 1) Crear la base si no existe
    await createDatabaseIfNotExists();
    // 2) Cronecta al esquema nuevo
    await sequelize.authenticate();
    console.log('🗄️  Conexión a MySQL verificada')
    // 3) Ejecutar todas las migraciones pendientes
    await runMigrations();
    // 4) Ejecutar los seeders
    await runSeeders(); 
  } catch (err) {
    console.error('❌ Falló la inicialización de la base de datos:', err);
    process.exit(1);  // detiene la app si no pudo crear/migrar
  }
})();

app.use('/api/auth', authRoutes);
app.use('/api/users',    userRoutes);
app.use('/api/parkings', parkingRoutes);
app.use('/api/registerpersonal', registerPersonalRoutes);
app.use(errorHandler);
 
export default app;
