const mysql = require('mysql2');

const config = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'to_do_task'
};

function connectWithRetry() {
  const connection = mysql.createConnection(config);

  connection.connect((err) => {
    if (err) {
      console.error('Database connection failed, retrying in 5s...', err.message);
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log('MySQL Connected!');
    }
  });

  module.exports = connection;
}

connectWithRetry();
