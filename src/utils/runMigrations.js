import { SequelizeStorage, Umzug } from 'umzug';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';
import { createRequire } from 'module';
import { sequelize } from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const migrationsDir = path.join(__dirname, '../migrations');
const { Sequelize } = sequelize;
const require = createRequire(import.meta.url);

export async function runMigrations() {
  const migrator = new Umzug({
    migrations: {
      glob: ['*.cjs', { cwd: migrationsDir }],
      resolve: ({ name, path: filePath }) => {
        // Carga CommonJS incluso en modo ESM
        const migration = require(filePath);
        return {
          name,
          up:   () => migration.up(sequelize.getQueryInterface(), Sequelize),
          down: () => migration.down(sequelize.getQueryInterface(), Sequelize)
        };
      }
    },
    storage: new SequelizeStorage({ sequelize }),
    logger: console
  });

  const pending = await migrator.pending();
  console.log('📄 Migraciones pendientes:', pending.map(m => m.name));
  if (pending.length) await migrator.up();
  console.log('✅ Migraciones aplicadas');
}

