# 🚀 Quick Start Guide - Student Portal

## 5 Minutes to Run the App

### Prerequisites
- **Node.js installed?** Check: `node --version`

### Step 1️⃣: Open Terminal/CMD
Go to the project folder and navigate to backend:
```bash
cd d:\student_portal\backend
```

### Step 2️⃣: Install Dependencies
```bash
npm install
```
(This installs Express and CORS - only 2 dependencies!)

### Step 3️⃣: Start Backend Server
```bash
npm start
```

You'll see:
```
Backend running on port 5000
```

### Step 4️⃣: Open Browser
Go to: http://localhost:5000

✅ **Done!** You're in the Student Portal

---

## 📝 Test Login

**Email:** `john@example.com`  
**Password:** `password123`

Or click "Register" to create a new account.

---

## 🎯 What You Can Do

1. **View Dashboard** - Stats and overview
2. **Check Attendance** - With percentage calculation
3. **See Exam Marks** - By subject
4. **Download Materials** - Study resources
5. **Read Circulars** - Important notices
6. **Track Fees** - Payment status
7. **Edit Profile** - View your information

---

## 🛑 To Stop Backend

Press `Ctrl + C` in terminal

---

## 📁 Where is my Data?

All data is saved in: `backend/data.json`

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot GET /" | Backend not running - use `npm start` |
| Port 5000 in use | Change PORT in `backend/server.js` |
| Blank tables | Add data via API or check backend |
| Can't register | Backend crashed - restart with `npm start` |

---

## 📚 Project Files

```
backend/
├── server.js      ← All API routes
├── data.json      ← Your data (auto-created)
└── package.json   ← Dependencies

frontend/
├── index.html     ← All HTML content
├── styles.css     ← All styling
├── script.js      ← All JavaScript logic
└── package.json   ← Frontend info
```

---

## 🎓 Next Steps

1. ✅ Get it running (done!)
2. Create a few student accounts
3. Add attendance/marks via Postman
4. Customize the CSS for your college
5. Deploy online (Render, Heroku, etc.)

---

**Need help?** Check `SETUP_GUIDE.md` for detailed instructions.
