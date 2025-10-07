const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/tasks', taskController.addTask);
router.get('/tasks/todo', taskController.getToDoTasks);
router.put('/tasks/:id/done', taskController.markAsDone);
router.put('/tasks/:id', taskController.updateTask);       // ✅ added
router.delete('/tasks/:id', taskController.deleteTask);    // ✅ added

module.exports = router;