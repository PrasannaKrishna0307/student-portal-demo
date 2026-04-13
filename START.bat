@echo off
REM Student Portal - Quick Start Script for Windows

echo.
echo ========================================
echo   Student Portal - Starting Application
echo ========================================
echo.

REM Check if MongoDB is running
echo Checking MongoDB connection...
cd backend
timeout /t 2 /nobreak

REM Start Backend
echo.
echo Starting Backend Server...
echo.
start "Backend Server" cmd /k npm start

REM Wait for backend to start
timeout /t 5 /nobreak

REM Start Frontend
echo.
echo Starting Frontend Server...
echo.
cd ..\frontend
start "Frontend Server" cmd /k npm run dev

echo.
echo ========================================
echo   Applications Starting!
echo ========================================
echo.
echo ✓ Backend: http://localhost:5000
echo ✓ Frontend: http://localhost:3000
echo.
echo Frontend will open automatically in your browser.
echo.
echo To stop: Close the terminal windows or press CTRL+C
echo.
pause
