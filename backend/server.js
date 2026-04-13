const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Data file path
const dataFile = path.join(__dirname, 'data.json');

// Load data from file
function loadData() {
  if (fs.existsSync(dataFile)) {
    return JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  }
  return {
    students: [],
    attendance: [],
    examMarks: [],
    notes: [],
    circulars: [],
    fees: []
  };
}

// Save data to file
function saveData(data) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

// Auth Routes
app.post('/api/students/register', (req, res) => {
  const { name, email, password, registrationNumber } = req.body;
  const data = loadData();
  
  if (data.students.find(s => s.email === email)) {
    return res.status(400).json({ success: false, message: 'Email already registered' });
  }
  
  const student = {
    id: Date.now().toString(),
    name,
    email,
    password,
    registrationNumber,
    course: 'B.Tech',
    semester: 4,
    joinDate: new Date().toLocaleDateString()
  };
  
  data.students.push(student);
  saveData(data);
  res.json({ success: true, message: 'Registration successful', student });
});

app.post('/api/students/login', (req, res) => {
  const { email, password } = req.body;
  const data = loadData();
  
  const student = data.students.find(s => s.email === email && s.password === password);
  
  if (!student) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  
  res.json({
    success: true,
    student: {
      id: student.id,
      name: student.name,
      email: student.email,
      registrationNumber: student.registrationNumber || student.regNumber,
      course: student.course,
      semester: student.semester
    }
  });
});

app.get('/api/students/:id', (req, res) => {
  const data = loadData();
  const student = data.students.find(s => s.id === req.params.id);
  if (!student) return res.status(404).json({ error: 'Student not found' });
  
  const attendance = data.attendance.filter(a => a.studentId === req.params.id);
  const examMarks = data.examMarks.filter(m => m.studentId === req.params.id);
  const notes = data.notes.filter(n => n.studentId === req.params.id);
  const circulars = data.circulars.filter(c => c.studentId === req.params.id || !c.studentId);
  const feePayments = data.fees.filter(f => f.studentId === req.params.id);
  
  res.json({
    student: {
      ...student,
      attendance,
      examMarks,
      notes,
      circulars,
      feePayments
    }
  });
});

// Attendance Routes
app.get('/api/attendance/:studentId', (req, res) => {
  const data = loadData();
  const attendance = data.attendance.filter(a => a.studentId === req.params.studentId);
  res.json({ attendance });
});

app.post('/api/attendance', (req, res) => {
  const data = loadData();
  const record = { id: Date.now().toString(), ...req.body, date: new Date() };
  data.attendance.push(record);
  saveData(data);
  res.json(record);
});

app.get('/api/attendance/summary/:studentId', (req, res) => {
  const data = loadData();
  const attendance = data.attendance.filter(a => a.studentId === req.params.studentId);
  const total = attendance.length;
  const present = attendance.filter(a => a.status === 'present').length;
  const percentage = total > 0 ? ((present / total) * 100).toFixed(2) : 0;
  res.json({ total, present, absent: total - present, percentage });
});

// Exam Marks Routes
app.get('/api/examMarks/:studentId', (req, res) => {
  const data = loadData();
  const marks = data.examMarks.filter(m => m.studentId === req.params.studentId);
  res.json({ examMarks: marks });
});

app.post('/api/examMarks', (req, res) => {
  const data = loadData();
  const mark = { id: Date.now().toString(), ...req.body, date: new Date() };
  data.examMarks.push(mark);
  saveData(data);
  res.json(mark);
});

// Notes Routes
app.get('/api/notes/:studentId', (req, res) => {
  const data = loadData();
  const notes = data.notes.filter(n => n.studentId === req.params.studentId);
  res.json({ notes: notes });
});

app.post('/api/notes', (req, res) => {
  const data = loadData();
  const note = { id: Date.now().toString(), ...req.body, uploadDate: new Date() };
  data.notes.push(note);
  saveData(data);
  res.json(note);
});

// Circulars Routes
app.get('/api/circulars/:studentId', (req, res) => {
  const data = loadData();
  const circulars = data.circulars.filter(c => c.studentId === req.params.studentId || !c.studentId);
  res.json({ circulars: circulars });
});

app.post('/api/circulars', (req, res) => {
  const data = loadData();
  const circular = { id: Date.now().toString(), ...req.body, issuedDate: new Date() };
  data.circulars.push(circular);
  saveData(data);
  res.json(circular);
});

// Fee Payments Routes (using feePayments instead of fees)
app.get('/api/feePayments/:studentId', (req, res) => {
  const data = loadData();
  const fees = data.fees.filter(f => f.studentId === req.params.studentId);
  res.json({ feePayments: fees });
});

app.post('/api/feePayments', (req, res) => {
  const data = loadData();
  const fee = { id: Date.now().toString(), ...req.body };
  data.fees.push(fee);
  saveData(data);
  res.json(fee);
});

app.put('/api/feePayments/:id', (req, res) => {
  const data = loadData();
  const fee = data.fees.find(f => f.id === req.params.id);
  if (!fee) return res.status(404).json({ error: 'Fee not found' });
  fee.status = 'paid';
  fee.paidDate = new Date();
  saveData(data);
  res.json(fee);
});

// Legacy fees endpoints for compatibility
app.get('/api/fees/:studentId', (req, res) => {
  const data = loadData();
  const fees = data.fees.filter(f => f.studentId === req.params.studentId);
  res.json(fees);
});

app.post('/api/fees', (req, res) => {
  const data = loadData();
  const fee = { id: Date.now().toString(), ...req.body };
  data.fees.push(fee);
  saveData(data);
  res.json(fee);
});

app.put('/api/fees/:id', (req, res) => {
  const data = loadData();
  const fee = data.fees.find(f => f.id === req.params.id);
  if (!fee) return res.status(404).json({ error: 'Fee not found' });
  fee.status = 'paid';
  fee.paidDate = new Date();
  saveData(data);
  res.json(fee);
});

app.get('/api/fees/summary/:studentId', (req, res) => {
  const data = loadData();
  const fees = data.fees.filter(f => f.studentId === req.params.studentId);
  const totalDue = fees.filter(f => f.status === 'pending').reduce((sum, f) => sum + f.amount, 0);
  const totalPaid = fees.filter(f => f.status === 'paid').reduce((sum, f) => sum + f.amount, 0);
  res.json({ totalDue, totalPaid, pending: fees.filter(f => f.status === 'pending').length });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ message: 'Backend running on port 5000' });
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on port ${PORT}`);
  console.log('Data stored in: ' + dataFile);
});
