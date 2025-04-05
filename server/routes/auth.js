const express = require('express');
const router = express.Router();
const db = require('../db');
const { generateToken } = require('../utils/jwt');

// Register Student
router.post('/register/student', (req, res) => {
  const { name, qualification, dob, course_id, add_id, phno, usrnm, paswrd } = req.body;
  const sql = `CALL RegisterStudent(?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [name, qualification, dob, course_id, add_id, phno, usrnm, paswrd], (err) => {
    if (err) return res.status(500).json({ error: 'Student registration failed.', details: err });
    res.status(201).json({ message: 'Student registered successfully.' });
  });
});

// Register Teacher
router.post('/register/teacher', (req, res) => {
  const { name, email, phno, usrnm, paswrd } = req.body;
  const sql = `CALL RegisterTeacher(?, ?, ?, ?, ?)`;
  db.query(sql, [name, email, phno, usrnm, paswrd], (err) => {
    if (err) return res.status(500).json({ error: 'Teacher registration failed.', details: err });
    res.status(201).json({ message: 'Teacher registered successfully.' });
  });
});

// Login (common for both)

router.post('/login', (req, res) => {
    const { usrnm, paswrd } = req.body;
  
    const studentQuery = `SELECT stu_id AS id, name, 'student' AS role FROM Student WHERE usrnm = ? AND paswrd = ?`;
  
    db.query(studentQuery, [usrnm, paswrd], (err, studentResults) => {
      if (err) return res.status(500).json({ message: 'Login failed', error: err });
  
      if (studentResults.length > 0) {
        const user = studentResults[0];
        const token = generateToken(user);
  
        return res
          .cookie('token', token, {
            httpOnly: true,
            secure: false, // Set to true in production
            sameSite: 'lax',
            maxAge: 2 * 60 * 60 * 1000
          })
          .json({ message: 'Login successful', user });
      }
  
      // If not a student, try teacher
      const teacherQuery = `SELECT teacher_id AS id, name, 'teacher' AS role FROM Teacher WHERE usrnm = ? AND paswrd = ?`;
  
      db.query(teacherQuery, [usrnm, paswrd], (err, teacherResults) => {
        if (err) return res.status(500).json({ message: 'Login failed', error: err });
  
        if (teacherResults.length === 0)
          return res.status(401).json({ message: 'Invalid credentials' });
  
        const user = teacherResults[0];
        const token = generateToken(user);
  
        return res
          .cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 2 * 60 * 60 * 1000
          })
          .json({ message: 'Login successful', user });
      });
    });
  });
  

router.post('/logout', (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out successfully' });
});


module.exports = router;
