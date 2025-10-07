import React, { useEffect, useState } from 'react';
import './list-task.css';
import { FaCheckCircle, FaEye, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

export default function ListTask() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState('');
  const [viewTask, setViewTask] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', due_date: '' });

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/tasks/todo');
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      setMessage('Failed to load tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDone = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}/done`, { method: 'PUT' });
      setMessage('Task marked as done');
      fetchTasks();
    } catch (error) {
      setMessage('Failed to update task');
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${id}`, { method: 'DELETE' });
      setMessage('Task deleted');
      fetchTasks();
    } catch (error) {
      setMessage('Failed to delete task');
    }
  };

  const handleView = (task) => setViewTask(task);

  const handleEdit = (task) => {
    setEditTask(task);
    setEditForm({
      title: task.title,
      description: task.description,
      due_date: task.due_date.split('T')[0],
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async () => {
    try {
      await fetch(`http://localhost:5000/api/tasks/${editTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      setMessage('Task updated');
      setEditTask(null);
      fetchTasks();
    } catch (error) {
      setMessage('Failed to update task');
    }
  };

  return (
    <div className="list-page">
      <div className="list-container">
        <div className="list-header">
          <div className="list-col title-desc"><strong>Task</strong></div>
          <div className="list-col date"><strong>Due</strong></div>
          <div className="list-col actions"><strong>Actions</strong></div>
          <div className="list-col done"><strong>Status</strong></div>
        </div>

        {tasks.length === 0 ? (
          <p className="list-empty">No tasks to show!</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="list-card">
              <div className="list-col title-desc">
                <h2 className="list-title">{task.title}</h2>
                <p className="list-desc">{task.description}</p>
              </div>
              <div className="list-col date">
                <p className="list-date">{task.due_date.split('T')[0]}</p>
              </div>
              <div className="list-col actions">
                <button className="icon-btn" onClick={() => handleView(task)} title="View Task">
                  <FaEye />
                </button>
                <button className="icon-btn" onClick={() => handleEdit(task)} title="Edit Task">
                  <FaEdit />
                </button>
                <button className="icon-btn" onClick={() => handleDelete(task.id)} title="Delete Task">
                  <FaTrash />
                </button>
              </div>
              <div className="list-col done">
                <button className="done-btn" onClick={() => handleDone(task.id)}>
                  <FaCheckCircle /> Done
                </button>
              </div>
            </div>
          ))
        )}

        {/* View Popup */}
        {viewTask && (
          <div className="popup">
            <div className="popup-content">
              <button className="popup-close" onClick={() => setViewTask(null)}>
                <FaTimes />
              </button>
              <h3>{viewTask.title}</h3>
              <p>{viewTask.description}</p>
              <p><strong>Due:</strong> {viewTask.due_date.split('T')[0]}</p>
            </div>
          </div>
        )}

        {/* Edit Popup */}
        {editTask && (
          <div className="popup">
            <div className="popup-content">
              <button className="popup-close" onClick={() => setEditTask(null)}>
                <FaTimes />
              </button>
              <h3>Edit Task</h3>
              <input type="text" name="title" value={editForm.title} onChange={handleEditChange} />
              <textarea name="description" value={editForm.description} onChange={handleEditChange} rows="3" />
              <input type="date" name="due_date" value={editForm.due_date} onChange={handleEditChange} />
              <button className="save-btn" onClick={handleEditSubmit}>Save</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
