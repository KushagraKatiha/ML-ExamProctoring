const express = require('express');
const router = express.Router();
const db = require('../db');
const { authenticateToken } = require('../utils/jwt');

// All routes below require valid JWT
router.use(authenticateToken);

// Create Exam
router.post('/create-exam', (req, res) => {
  const { exam_name, exam_course, exam_subject } = req.body;
  const created_by = req.user.id;

  const sql = `CALL CreateExam(?, ?, ?, ?)`;
  db.query(sql, [exam_name, exam_course, exam_subject, created_by], (err) => {
    if (err) return res.status(500).json({ error: 'Exam creation failed.', details: err });
    res.status(201).json({ message: 'Exam created successfully.' });
  });
});

// Add Question with Options
router.post('/add-question', (req, res) => {
  const {
    exam_id,
    ques_text,
    opt1, opt1_correct,
    opt2, opt2_correct,
    opt3, opt3_correct,
    opt4, opt4_correct
  } = req.body;

  const sql = `CALL AddQuestionWithOptions(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [exam_id, ques_text, opt1, opt1_correct, opt2, opt2_correct, opt3, opt3_correct, opt4, opt4_correct], (err) => {
    if (err) return res.status(500).json({ error: 'Adding question failed.', details: err });
    res.status(201).json({ message: 'Question added successfully.' });
  });
});

module.exports = router;
