const express = require('express');
const cors = require('cors');
const app = express();
const taskRoutes = require('./routes/taskRoutes');

app.use(cors());
app.use(express.json());
app.use('/api', taskRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});