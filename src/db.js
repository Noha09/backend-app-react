import cliente from 'pg';
const { Pool } = cliente;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

pool.connect()
  .then(() => console.log('Conectado a la base de datos exitosamente ✔️'))
  .catch(err => console.error('Error de conexión a la base de datos ❌', err.stack))
  .finally(() => pool.end());

export {
  pool
};