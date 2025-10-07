const db = require('../db');

// Add new task
exports.addTask = (req, res) => {
  const { title, description, due_date } = req.body;
  const status_id = 1; // default "To Do"
  const sql = 'INSERT INTO task (title, description, due_date, status_id) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, description, due_date, status_id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ message: 'Task added successfully', taskId: result.insertId });
  });
};

exports.getToDoTasks = (req, res) => {
  const sql = 'SELECT * FROM task WHERE status_id = 1 ORDER BY id DESC LIMIT 5';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.send(results);
  });
};

// Mark task as done
exports.markAsDone = (req, res) => {
  const { id } = req.params;
  const sql = 'UPDATE task SET status_id = 2 WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Task marked as done' });
  });
};

// Edit task
exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, due_date } = req.body;
  const sql = 'UPDATE task SET title = ?, description = ?, due_date = ? WHERE id = ?';
  db.query(sql, [title, description, due_date, id], (err, result) => {
    if (err) return res.status(500).send({ message: 'Update failed', error: err });
    res.send({ message: 'Task updated successfully' });
  });
};

// Delete task
exports.deleteTask = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM task WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).send({ message: 'Delete failed', error: err });
    res.send({ message: 'Task deleted successfully' });
  });
};