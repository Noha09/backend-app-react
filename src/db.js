import {config} from 'dotenv'
import {pg} from 'pg';

config()

const pool = new pg.Pool({
  connectionString: process.env.DB_USER,
  ssl: true
});

export {
  pool
};