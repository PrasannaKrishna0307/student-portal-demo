# 📚 Student Portal

A modern, fully-functional student information portal built with vanilla HTML/CSS/JavaScript and Node.js Express backend with JSON file storage.

## 🎯 Overview

The Student Portal is a web application designed for students to manage their academic information in one place. It provides features for tracking attendance, viewing exam marks, accessing study materials, reading college circulars, and managing fee payments.

**Key Highlights:**
- ⚡ Zero dependencies frontend (pure HTML/CSS/JS)
- 🚀 Minimal backend (only Express and CORS)
- 💾 Simple JSON file storage (no database needed)
- 📱 Fully responsive design
- 🔐 Student authentication
- 🎓 Complete academic management

## ✨ Features

- ✅ **User Authentication** - Login & Registration  
- ✅ **Attendance Tracking** - View records and percentage calculations
- ✅ **Exam Marks** - Check results with automatic grade display
- ✅ **Study Materials** - Download lecture notes and resources
- ✅ **College Circulars** - Read important announcements
- ✅ **Fee Management** - Track and manage college fees
- ✅ **Student Profile** - View and manage student information
- ✅ **Dashboard** - Quick statistics overview
- ✅ **Responsive Design** - Works on all devices

## 🛠 Tech Stack

**Backend:** Node.js, Express.js (2 npm dependencies only)
**Frontend:** Vanilla HTML5, CSS3, JavaScript ES6+
**Storage:** JSON file (`data.json`) - No database required
**Port:** 5000

## 📋 Prerequisites

- Node.js v14+ ([Download](https://nodejs.org/))
- Modern web browser
- 5 minutes of your time!

## 🚀 Quick Start

### **1. Backend Setup**
```bash
cd backend
npm install
npm start
```

### **2. Frontend Setup** (new terminal)
```bash
cd frontend
npm install
npm run dev
```

### **3. Open Application**
Visit `http://localhost:3000`

## 📝 Test Credentials

Register with any email address to start testing!

## 📚 Complete Setup Guide

🔗 **See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for:**
- Detailed MongoDB setup
- Adding sample data with MongoDB Compass
- API endpoints reference
- Feature descriptions
- Troubleshooting guide
- Complete project structure

## 📁 Project Structure

```
student-portal/
├── backend/              (Node.js + Express + MongoDB)
│   ├── models/          (Database schemas)
│   ├── routes/          (API routes)
│   └── server.js
├── frontend/            (React + Vite)
│   ├── src/pages/       (Login, Dashboard, Attendance, etc.)
│   ├── src/components/  (Navbar component)
│   └── src/context/     (Authentication context)
└── SETUP_GUIDE.md       (Complete step-by-step guide)
```

## 🗄 Database Collections

- `students` - User accounts
- `attendance` - Attendance records  
- `exammarks` - Exam results
- `notes` - Study materials
- `circulars` - Announcements
- `feepayments` - Fee records

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/students/register` | Register |
| POST | `/api/students/login` | Login |
| GET | `/api/attendance/:id` | Get attendance |
| POST | `/api/attendance` | Add attendance |
| GET | `/api/exam-marks/:id` | Get marks |
| GET | `/api/notes` | Get study materials |
| GET | `/api/circulars` | Get announcements |
| GET | `/api/fees/:id` | Get fees |

## 🎓 Navigation Map

```
LOGIN → DASHBOARD → ATTENDANCE
                 → EXAM MARKS
                 → STUDY MATERIALS
                 → CIRCULARS
                 → FEE PAYMENT
                 → PROFILE (Logout)
```

## ⚡ Running Commands

**Start Backend:**
```bash
cd backend
npm start
```

**Start Frontend:**
```bash
cd frontend
npm run dev
```

**Backend runs on:** `http://localhost:5000`  
**Frontend runs on:** `http://localhost:3000`

## 🔧 Troubleshooting

- **MongoDB not connecting?** - Check if MongoDB service is running
- **Backend error?** - Verify `.env` file and port 5000 is free
- **Frontend not loading?** - Ensure backend is running on port 5000

## 📖 Full Documentation

👉 Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) for complete setup instructions including:
- MongoDB installation steps
- Adding sample data
- Database structure
- API documentation
- Troubleshooting guide

---

**Ready to get started?** Follow the [SETUP_GUIDE.md](./SETUP_GUIDE.md)! 🚀
