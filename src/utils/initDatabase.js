// src/utils/initDatabase.js
import mysql from 'mysql2/promise';
import 'dotenv/config';

export async function createDatabaseIfNotExists() {
  const { DB_HOST,PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

  // 1) Conectarse al servidor sin especificar DB
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: PORT,
    user: DB_USER,
    password: DB_PASS
  });

  // 2) Crear la base si no existe, con el charset que usas
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`
     CHARACTER SET utf8mb4
     COLLATE utf8mb4_general_ci;`
  );
  console.log(`✅ Base de datos '${DB_NAME}' verificada/creada`);

  // 3) Cerrar la conexión
  await connection.end();
}
