import pkg from 'pg';

const { Pool } = pkg;

const connection = new Pool({
  host: 'localhost',
  port: process.env.POSTGRES_PORT,
  user: process.env.USER,
  password: process.env.POSTGRES_PASSWORD,
  database: 'shortly'//process.env.DATABASE
}); 

export default connection; 