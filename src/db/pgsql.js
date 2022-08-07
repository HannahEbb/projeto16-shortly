import pkg from 'pg';
import dotenv from 'dotenv';

const { Pool } = pkg;

const connection = new Pool({
  host: 'localhost',
  port: process.env.POSTGRES_PORT,
  user: process.env.USER,
  password: process.env.POSTGRES_PASSWORD,
  database: 'shortly'
}); 

export default connection; 