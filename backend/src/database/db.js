// db.js
const mysql2 = require('mysql2/promise');
const pool = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chatApp',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  rowsAsArray: true,
});

module.exports = pool;