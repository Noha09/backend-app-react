import cliente from 'pg';
const { Pool } = cliente;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'clase_react',
  password: '12345678',
  port: 5432,
});

export {
  pool
};