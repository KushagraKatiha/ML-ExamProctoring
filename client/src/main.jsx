// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import LoginForm from './Components/LoginForm';
import RegistrationForm from './Components/RegistrationForm';
import StudentDashboard from './Components/StudentDashboard';
import TeacherDashboard from './Components/TeacherDashboard';
import AppLayout from './Components/AppLayout';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        </Routes>
      </AppLayout>
    </Router>
  </React.StrictMode>
);
