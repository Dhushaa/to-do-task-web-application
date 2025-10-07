import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddTask from './pages/add-task';
import ListTask from './pages/list-task';
import Welcome from './pages/welcome';
import './App.css';

function App() {
  return (
    <Router>
      <div className="layout-container">
        {/* Header */}
        <header className="app-header">
          <h1>Task Manager</h1>
          <img src="/logoo.jpeg" alt="Logo" className="logo-img" />

        </header>

        <div className="app-body">
          <aside className="sidebar">
  <nav>
    <Link to="/">🏠 Welcome</Link>
    <Link to="/add-task">🛠️ Add Task</Link>
    <Link to="/list-task">📑 My Tasks</Link>
 

  </nav>
</aside>

          {/* Main Content */}
          <main className="main-content">
            <Routes>
                  <Route path="/" element={<Welcome />} />
              <Route path="/add-task" element={<AddTask />} />
              <Route path="/list-task" element={<ListTask />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;