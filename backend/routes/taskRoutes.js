const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Create a new task
router.post('/tasks', taskController.addTask);

// Get all to-do tasks
router.get('/tasks/todo', taskController.getToDoTasks);

// Mark a task as done
router.put('/tasks/:id/done', taskController.markAsDone);

// Update a task
router.put('/tasks/:id', taskController.updateTask);

// Delete a task
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
