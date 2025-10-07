import React, { useState } from 'react';
import './add-task.css';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaRegEdit, FaAlignLeft } from 'react-icons/fa';


export default function AddTask() {
  const API_URL = process.env.REACT_APP_API_URL || 'https://zany-space-rotary-phone-g4rvqqrgqvxgh56w-5000.app.github.dev';
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    due_date: '',
    description: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
    const res = await fetch(`${API_URL}/api/tasks`, {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
      });
      const data = await res.json();
      setMessage(data.message || 'Task added successfully');

      setTimeout(() => navigate('/list-task'), 1500);
    } catch (error) {
      setMessage('Failed to add task');
    }
  };

  return (
    <div className="task-page">
      <div className="task-container">
        {/* Left Panel */}
        <div className="task-left">
          
          <h1 className="task-heading">Welcome Back!</h1>
          <p className="task-paragraph">
            Plan your day, stay productive, and never miss a task. Add your goals and let’s get things done!
          </p>
          <button className="task-learn-btn">About TaskManager</button>
        </div>

        {/* Right Panel */}
        <div className="task-right">
          <div className="task-input-group">
            <FaRegEdit className="task-icon" />
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={task.title}
              onChange={handleChange}
            />
          </div>

          <div className="task-input-group">
            <FaCalendarAlt className="task-icon" />
            <input
              type="date"
              name="due_date"
              value={task.due_date}
              onChange={handleChange}
            />
          </div>

          <div className="task-input-group">
            <FaAlignLeft className="task-icon" />
            <textarea
              name="description"
              placeholder="Task Description"
              value={task.description}
              onChange={handleChange}
              rows="4"
            />
          </div>

          <button className="task-submit-btn" onClick={handleSubmit}>Create Task</button>

          {message && (
            <p className="task-message">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}