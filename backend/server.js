const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [process.env.FRONTEND_URL, 'http://localhost:5173', 'http://localhost:3000'].filter(Boolean),
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ot_scheduler')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/surgeries', require('./routes/surgeryRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/patients', require('./routes/patientRoutes'));
app.use('/api/resources', require('./routes/resourceRoutes'));

app.get('/', (req, res) => {
  res.send('OT Scheduler API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
