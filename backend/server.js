const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// ===== CORS Configuration =====
app.use(cors({
  origin: [
    'https://zany-space-rotary-phone-g4rvqqrgqvxgh56w-3000.app.github.dev',
    'http://localhost:3000'
  ],
  credentials: true
}));

// ===== Middleware =====
app.use(express.json()); // Parses JSON request bodies

// ===== Routes =====
app.use('/api', taskRoutes);

// ===== Health Check =====
app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
