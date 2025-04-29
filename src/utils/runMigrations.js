import { SequelizeStorage, Umzug } from 'umzug';
import { fileURLToPath } from 'url';
import path from 'path';
import { sequelize } from '../config/database.js';

// Reconstruye __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function runMigrations() {
  const umzug = new Umzug({
    migrations: {
      glob: path.join(__dirname, '../migrations/*.js'),
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });

  await umzug.up();
  console.log('✅ Migraciones automáticas ejecutadas');

  const seeder = new Umzug({
    migrations: { 
      glob: path.join(__dirname, '../seeders/*.js'),
    },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, modelName: 'SequelizeData' }),
  logger: console,
});

await seeder.up();
console.log('✅ Seeds aplicadas');

}
