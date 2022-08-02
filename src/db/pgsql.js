import pkg from 'pg';

const { Pool } = pkg;

const connection = new Pool({
  host: 'localhost',
  port: 55000,
  user: 'postgres',
  password: 'postgrespw',
  database: 'boardcamp'
});

export default connection;