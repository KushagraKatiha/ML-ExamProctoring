const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');


const authRoutes = require('./routes/auth');
const teacherRoutes = require('./routes/teacher');
const studentRoutes = require('./routes/student');

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/student', studentRoutes);

// Start Server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
