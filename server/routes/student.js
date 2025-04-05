const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateToken } = require('../utils/jwt');

router.use(authenticateToken);

// Get exams for student course
router.get('/exams', (req, res) => {
  const stu_id = req.user.id;

  const sql = `
    SELECT e.* FROM Exam e
    JOIN Student s ON s.course_id = e.exam_course
    WHERE s.stu_id = ?
  `;
  db.query(sql, [stu_id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Fetching exams failed.', details: err });
    res.json(results);
  });
});


// Attempt Exam
router.post('/attempt-exam', (req, res) => {
    const stu_id = req.user.id;
    const { exam_id } = req.body;
  
    const sql = `CALL AttemptExam(?, ?)`;
    db.query(sql, [stu_id, exam_id], (err) => {
      if (err) return res.status(500).json({ error: 'Failed to attempt exam.', details: err });
      res.status(201).json({ message: 'Exam started successfully.' });
    });
  });
  
  

// Submit Answer
router.post('/submit-answer', (req, res) => {
    const stu_id = req.user.id;
    const { exam_id, ques_id, option_id } = req.body;
  
    const sql = `CALL SubmitAnswer(?, ?, ?, ?)`;
    db.query(sql, [stu_id, exam_id, ques_id, option_id], (err) => {
      if (err) return res.status(500).json({ error: 'Submitting answer failed.', details: err });
      res.status(200).json({ message: 'Answer submitted.' });
    });
  });
  

// Save Result
router.post('/submit-result', (req, res) => {
    const stu_id = req.user.id;
    const { exam_id } = req.body;
  
    const sql = `CALL SaveResult(?, ?)`;
    db.query(sql, [stu_id, exam_id], (err) => {
      if (err) return res.status(500).json({ error: 'Saving result failed.', details: err });
      res.status(200).json({ message: 'Result saved successfully.' });
    });
  });
    

// View Result
router.get('/result', (req, res) => {
    const stu_id = req.user.id;
  
    const sql = `SELECT * FROM student_result WHERE stu_id = ?`;
    db.query(sql, [stu_id], (err, result) => {
      if (err) return res.status(500).json({ error: 'Fetching results failed.', details: err });
      res.json(result);
    });
  });
  
module.exports = router;
