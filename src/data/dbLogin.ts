import 'dotenv/config';
import mysql from 'mysql2/promise';

export interface DbLogin {
  username: string;
  password: string;
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10
});

export async function getLoginById(id: number): Promise<DbLogin> {
  const [rows] = await pool.query<any[]>(
    'SELECT * FROM login WHERE id = ? LIMIT 1',
    [id]
  );

  if (!rows.length) {
    throw new Error(`No login row found for id=${id}`);
  }

  // Adjust field names to match your table schema
  const row = rows[0];
  return {
    username: row.username ?? row.email,
    password: row.password
  };
}

export async function closePool() {
  await pool.end();
}
