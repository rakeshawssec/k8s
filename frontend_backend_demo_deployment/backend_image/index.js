const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_NAME,
  user: 'postgres',
  password: process.env.DB_PASSWORD,
});

pool.on('error', (err) => {
  console.error('Database pool error:', err.message);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

app.get('/api/message', async (req, res) => {
  try {
    const result = await pool.query('SELECT message FROM messages LIMIT 1');
    res.json(result.rows[0] || { message: 'No message found' });
  } catch (err) {
    console.error('Query error:', err.message);
    res.status(500).json({ error: 'Database error', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Backend running on port ${port}`);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
});