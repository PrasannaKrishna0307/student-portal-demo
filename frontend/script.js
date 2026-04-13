// =============================================
// Global Variables & Constants
// =============================================
const API_BASE = 'http://54.193.59.117:5000/api';
let currentUser = null;
let currentPage = 'dashboard';

// =============================================
// Initialization
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainApp();
        loadDashboardData();
    } else {
        showAuthPage();
    }
});

// =============================================
// Authentication Functions
// =============================================
function toggleAuthMode() {
    const registerFields = document.getElementById('register-fields');
    const authBtn = document.getElementById('auth-btn');
    const toggleText = document.getElementById('toggle-text');
    const authSubtitle = document.getElementById('auth-subtitle');

    const regName = document.getElementById('reg-name');
    const regNumber = document.getElementById('reg-number');

    if (registerFields.style.display === 'none') {
        // Register mode
        registerFields.style.display = 'flex';
        authBtn.textContent = 'Create Account';
        toggleText.textContent = 'Already have an account?';
        authSubtitle.textContent = 'Create a new account';

        // ✅ Enable required
        regName.required = true;
        regNumber.required = true;

    } else {
        // Login mode
        registerFields.style.display = 'none';
        authBtn.textContent = 'Sign In';
        toggleText.textContent = "Don't have an account?";
        authSubtitle.textContent = 'Sign in to your account';

        // ✅ Disable required (IMPORTANT)
        regName.required = false;
        regNumber.required = false;
    }
}

function handleAuth(e) {
    e.preventDefault();
    
    const registerFields = document.getElementById('register-fields');
    const isRegister = registerFields.style.display !== 'none';
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    
    if (isRegister) {
        const name = document.getElementById('reg-name').value;
        const regNumber = document.getElementById('reg-number').value;
        
        if (!name || !regNumber) {
            showError('Please fill in all fields');
            return;
        }
        
        registerStudent(name, regNumber, email, password);
    } else {
        loginStudent(email, password);
    }
}

function loginStudent(email, password) {
    const errorEl = document.getElementById('error-message');
    errorEl.style.display = 'none';
    
    fetch(`${API_BASE}/students/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            currentUser = data.student;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            showMainApp();
            loadDashboardData();
        } else {
            showError(data.message || 'Login failed');
        }
    })
    .catch(err => {
        console.error('Login error:', err);
        showError('Unable to connect to server. Please ensure backend is running on port 5000');
    });
}

function registerStudent(name, regNumber, email, password) {
    const errorEl = document.getElementById('error-message');
    errorEl.style.display = 'none';
    
    fetch(`${API_BASE}/students/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            name, 
            registrationNumber: regNumber, 
            email, 
            password,
            course: 'B.Tech',
            semester: 4
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            showError('Account created successfully! Please login.', false);
            setTimeout(() => {
                toggleAuthMode();
                document.getElementById('auth-form').reset();
            }, 1500);
        } else {
            showError(data.message || 'Registration failed');
        }
    })
    .catch(err => {
        console.error('Register error:', err);
        showError('Unable to connect to server. Please ensure backend is running on port 5000');
    });
}

function showError(message, isError = true) {
    const errorEl = document.getElementById('error-message');
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    if (!isError) {
        errorEl.style.color = '#059669';
        errorEl.style.borderLeftColor = '#059669';
        errorEl.style.backgroundColor = '#d1fae5';
    } else {
        errorEl.style.color = '#dc2626';
        errorEl.style.borderLeftColor = '#dc2626';
        errorEl.style.backgroundColor = '#fee2e2';
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        localStorage.removeItem('currentUser');
        showAuthPage();
        document.getElementById('auth-form').reset();
    }
}

// =============================================
// Page Navigation
// =============================================
function showAuthPage() {
    document.getElementById('auth-page').style.display = 'flex';
    document.getElementById('main-app').style.display = 'none';
}

function showMainApp() {
    document.getElementById('auth-page').style.display = 'none';
    document.getElementById('main-app').style.display = 'block';
    
    // Update navbar with user info
    document.getElementById('nav-username').textContent = `Welcome, ${currentUser.name}`;
    
    // Show dashboard by default
    showPage('dashboard');
}

function showPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Hide all nav links' active state
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected page
    const pageEl = document.getElementById(`${pageName}-page`);
    if (pageEl) {
        pageEl.classList.add('active');
    }
    
    // Mark nav link as active
    event?.target?.classList.add('active');
    
    currentPage = pageName;
    
    // Load page-specific data
    if (pageName === 'dashboard') {
        loadDashboardData();
    } else if (pageName === 'attendance') {
        loadAttendanceData();
    } else if (pageName === 'marks') {
        loadMarksData();
    } else if (pageName === 'notes') {
        loadNotesData();
    } else if (pageName === 'circulars') {
        loadCircularsData();
    } else if (pageName === 'fees') {
        loadFeesData();
    } else if (pageName === 'profile') {
        loadProfileData();
    }
}

function goToProfile() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    document.getElementById('profile-page').classList.add('active');
    loadProfileData();
}

// =============================================
// Dashboard Data
// =============================================
function loadDashboardData() {
    // Get student full data
    fetch(`${API_BASE}/students/${currentUser.id}`)
        .then(res => res.json())
        .then(data => {
            if (data.student) {
                // Calculate attendance percentage
                let attendancePercentage = 0;
                if (data.attendance && data.attendance.length > 0) {
                    const presentCount = data.attendance.filter(a => a.status === 'present').length;
                    attendancePercentage = Math.round((presentCount / data.attendance.length) * 100);
                }
                document.getElementById('stat-attendance').textContent = attendancePercentage + '%';
                
                // Get latest grade
                if (data.examMarks && data.examMarks.length > 0) {
                    const grades = data.examMarks.map(m => m.grade).filter(g => g);
                    document.getElementById('stat-grades').textContent = grades[0] || '-';
                }
                
                // Calculate fees due
                let totalDue = 0;
                if (data.feePayments) {
                    totalDue = data.feePayments
                        .filter(f => f.status === 'pending')
                        .reduce((sum, f) => sum + f.amount, 0);
                }
                document.getElementById('stat-fees').textContent = '₹' + totalDue;
                
                // Count circulars
                document.getElementById('stat-circulars').textContent = 
                    (data.circulars || []).length;
            }
        })
        .catch(err => console.error('Error loading dashboard:', err));
}

// =============================================
// Attendance Page
// =============================================
function loadAttendanceData() {
    fetch(`${API_BASE}/attendance/${currentUser.id}`)
        .then(res => res.json())
        .then(data => {
            if (data.attendance) {
                const attendanceList = data.attendance;
                
                // Calculate summary
                const total = attendanceList.length;
                const present = attendanceList.filter(a => a.status === 'present').length;
                const absent = total - present;
                const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
                
                document.getElementById('att-total').textContent = total;
                document.getElementById('att-present').textContent = present;
                document.getElementById('att-absent').textContent = absent;
                document.getElementById('att-percentage').textContent = percentage + '%';
                
                // Populate table
                const tbody = document.getElementById('attendance-list');
                tbody.innerHTML = '';
                
                attendanceList.forEach(att => {
                    const row = document.createElement('tr');
                    const statusClass = att.status === 'present' ? 'present' : 'absent';
                    const statusText = att.status.charAt(0).toUpperCase() + att.status.slice(1);
                    
                    row.innerHTML = `
                        <td>${att.date || 'N/A'}</td>
                        <td>${att.subject || 'N/A'}</td>
                        <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                    `;
                    tbody.appendChild(row);
                });
            }
        })
        .catch(err => console.error('Error loading attendance:', err));
}

// =============================================
// Exam Marks Page
// =============================================
function loadMarksData() {
    fetch(`${API_BASE}/examMarks/${currentUser.id}`)
        .then(res => res.json())
        .then(data => {
            if (data.examMarks) {
                const marksList = data.examMarks;
                const tbody = document.getElementById('marks-list');
                tbody.innerHTML = '';
                
                marksList.forEach(mark => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${mark.subject || 'N/A'}</td>
                        <td>${mark.examType || 'N/A'}</td>
                        <td>${mark.marksObtained || 0}</td>
                        <td>${mark.totalMarks || 100}</td>
                        <td><strong>${mark.grade || '-'}</strong></td>
                        <td>${mark.date || 'N/A'}</td>
                    `;
                    tbody.appendChild(row);
                });
                
                if (marksList.length === 0) {
                    tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: var(--text-light);">No exam marks available</td></tr>';
                }
            }
        })
        .catch(err => console.error('Error loading marks:', err));
}

// =============================================
// Notes/Materials Page
// =============================================
function loadNotesData() {
    fetch(`${API_BASE}/notes/${currentUser.id}`)
        .then(res => res.json())
        .then(data => {
            if (data.notes) {
                const notesList = data.notes;
                const grid = document.getElementById('notes-grid');
                grid.innerHTML = '';
                
                notesList.forEach(note => {
                    const noteCard = document.createElement('div');
                    noteCard.className = 'note-card';
                    noteCard.innerHTML = `
                        <h3>📄 ${note.title || 'Study Material'}</h3>
                        <p>${note.description || 'No description available'}</p>
                        <p style="font-size: 0.75rem; color: var(--text-light);">Subject: ${note.subject || 'N/A'}</p>
                        <a href="${note.fileUrl || '#'}" download>Download PDF</a>
                    `;
                    grid.appendChild(noteCard);
                });
                
                if (notesList.length === 0) {
                    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-light);">No materials available</p>';
                }
            }
        })
        .catch(err => console.error('Error loading notes:', err));
}

// =============================================
// Circulars Page
// =============================================
function loadCircularsData() {
    fetch(`${API_BASE}/circulars/${currentUser.id}`)
        .then(res => res.json())
        .then(data => {
            if (data.circulars) {
                const circularsList = data.circulars;
                const list = document.getElementById('circulars-list');
                list.innerHTML = '';
                
                circularsList.forEach(circular => {
                    const item = document.createElement('div');
                    item.className = 'circular-item';
                    item.innerHTML = `
                        <h3>📢 ${circular.title || 'Circular'}</h3>
                        <p class="circular-date">Posted: ${circular.date || 'N/A'}</p>
                        <p>${circular.content || 'No content available'}</p>
                    `;
                    list.appendChild(item);
                });
                
                if (circularsList.length === 0) {
                    list.innerHTML = '<p style="text-align: center; color: var(--text-light);">No circulars available</p>';
                }
            }
        })
        .catch(err => console.error('Error loading circulars:', err));
}

// =============================================
// Fees Payment Page
// =============================================
function loadFeesData() {
    fetch(`${API_BASE}/feePayments/${currentUser.id}`)
        .then(res => res.json())
        .then(data => {
            if (data.feePayments) {
                const feesList = data.feePayments;
                
                // Calculate summary
                const totalDue = feesList.reduce((sum, f) => sum + f.amount, 0);
                const totalPaid = feesList
                    .filter(f => f.status === 'paid')
                    .reduce((sum, f) => sum + f.amount, 0);
                const pendingCount = feesList.filter(f => f.status === 'pending').length;
                
                document.getElementById('fee-due').textContent = '₹' + totalDue;
                document.getElementById('fee-paid').textContent = '₹' + totalPaid;
                document.getElementById('fee-pending').textContent = pendingCount;
                
                // Populate table
                const tbody = document.getElementById('fees-list');
                tbody.innerHTML = '';
                
                feesList.forEach(fee => {
                    const row = document.createElement('tr');
                    const statusClass = fee.status === 'paid' ? 'paid' : 'pending';
                    const statusText = fee.status.charAt(0).toUpperCase() + fee.status.slice(1);
                    const isPaid = fee.status === 'paid';
                    
                    row.innerHTML = `
                        <td>${fee.description || 'Fee'}</td>
                        <td>₹${fee.amount || 0}</td>
                        <td>${fee.dueDate || 'N/A'}</td>
                        <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                        <td>
                            <button class="pay-btn" ${isPaid ? 'disabled' : ''} 
                                onclick="payFee('${fee.id || ''}')">
                                ${isPaid ? 'Paid' : 'Pay Now'}
                            </button>
                        </td>
                    `;
                    tbody.appendChild(row);
                });
            }
        })
        .catch(err => console.error('Error loading fees:', err));
}

function payFee(feeId) {
    // Simulate payment (in real app, this would integrate with payment gateway)
    alert('Payment gateway integration would happen here. Fee ID: ' + feeId);
    // You can update fee status to "paid" via API call:
    // markFeeAsPaid(feeId);
}

// =============================================
// Profile Page
// =============================================
function loadProfileData() {
    // Get student details from localStorage
    const avatar = currentUser.name.charAt(0).toUpperCase();
    
    document.getElementById('profile-avatar').textContent = avatar;
    document.getElementById('profile-name').textContent = currentUser.name;
    document.getElementById('profile-email').textContent = currentUser.email;
    document.getElementById('profile-reg').textContent = currentUser.registrationNumber || 'N/A';
    document.getElementById('profile-course').textContent = currentUser.course || 'B.Tech';
    document.getElementById('profile-semester').textContent = currentUser.semester || '4';
}

// =============================================
// Utility Functions
// =============================================
function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
}

// =============================================
// Sample Data (Optional - for testing)
// =============================================
function addSampleData() {
    // This function creates sample data via API calls
    // Can be called from browser console if needed
    
    const studentId = currentUser.id;
    
    // Sample attendance
    fetch(`${API_BASE}/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            studentId: studentId,
            date: '2024-01-15',
            subject: 'Data Structures',
            status: 'present'
        })
    }).catch(err => console.error('Error adding sample data:', err));
}