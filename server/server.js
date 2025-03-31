const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Database Connection
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ExamSystem',
    multipleStatements: true
});

// Register Teacher
app.post('/register-teacher', (req, res) => {
    const { name, email, phno, usrnm, paswrd } = req.body;
    db.query('CALL RegisterTeacher(?, ?, ?, ?, ?)', [name, email, phno, usrnm, paswrd],
        (err, result) => {
            if (err) res.status(500).send(err);
            else res.send('Teacher Registered Successfully');
        });
});

// Register Student
app.post('/register-student', (req, res) => {
    const { name, qualification, dob, course_id, add_id, phno, usrnm, paswrd } = req.body;
    db.query('CALL RegisterStudent(?, ?, ?, ?, ?, ?, ?, ?)', [name, qualification, dob, course_id, add_id, phno, usrnm, paswrd],
        (err, result) => {
            if (err) res.status(500).send(err);
            else res.send('Student Registered Successfully');
        });
});

// Create Exam
app.post('/create-exam', (req, res) => {
    const { exam_name, exam_course, exam_subject, created_by } = req.body;
    db.query('CALL CreateExam(?, ?, ?, ?)', [exam_name, exam_course, exam_subject, created_by],
        (err, result) => {
            if (err) res.status(500).send(err);
            else res.send('Exam Created Successfully');
        });
});

// Attempt Exam
app.post('/attempt-exam', (req, res) => {
    const { stu_id, exam_id } = req.body;
    db.query('CALL AttemptExam(?, ?)', [stu_id, exam_id],
        (err, result) => {
            if (err) res.status(500).send(err);
            else res.send('Exam Attempt Recorded');
        });
});

// Save Exam Result
app.post('/save-exam-result', (req, res) => {
    const { stu_id, exam_id } = req.body;
    db.query('CALL SaveExamResult(?, ?)', [stu_id, exam_id],
        (err, result) => {
            if (err) res.status(500).send(err);
            else res.send('Exam Result Saved');
        });
});

// Get All Students
app.get('/students', (req, res) => {
    db.query('CALL GetAllStudents()', (err, result) => {
        if (err) res.status(500).send(err);
        else res.json(result[0]);
    });
});

// Get All Results
app.get('/results', (req, res) => {
    db.query('CALL GetAllResults()', (err, result) => {
        if (err) res.status(500).send(err);
        else res.json(result[0]);
    });
});

// Start Server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
