import { SequelizeStorage, Umzug } from 'umzug';
import { fileURLToPath } from 'url';
import path from 'path';
import { createRequire } from 'module';
import { sequelize } from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const seedersDir = path.join(__dirname, '../seeders');
const { Sequelize } = sequelize;                //  <-- clase Sequelize
const require = createRequire(import.meta.url); //  <-- para cargar CJS

export async function runSeeders() {
  const seeder = new Umzug({
    migrations: {
      glob: ['*.cjs', { cwd: seedersDir }],
      // --- clave: adaptar la llamada pase 2 argumentos ---
      resolve: ({ name, path: filePath }) => {
        const seed = require(filePath);         // CommonJS
        return {
          name,
          up:   () => seed.up(sequelize.getQueryInterface(), Sequelize),
          down: () => seed.down
            ? seed.down(sequelize.getQueryInterface(), Sequelize)
            : Promise.resolve()
        };
      }
    },
    storage: new SequelizeStorage({
      sequelize,
      modelName: 'SequelizeData'                // tabla meta para seeds
    }),
    logger: console
  });

  const pending = await seeder.pending();
  console.log('📄 Seeds pendientes:', pending.map(m => m.name));

  if (pending.length) {
    await seeder.up();
    console.log('✅ Seeds aplicados');
  } else {
    console.log('✅ No hay seeds pendientes');
  }
}

