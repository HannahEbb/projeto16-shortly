import pkg from 'pg';

const { Pool } = pkg;

const connection = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'macmini',
  password: '#Inco2022',
  database: 'shortly'
});

export default connection;