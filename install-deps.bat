@echo off
echo [ARCHITECT] Installing dependencies for all services...

echo [ARCHITECT] Installing backend dependencies...
cd backend
npm install
cd ..

echo [ARCHITECT] Installing frontend dependencies...
cd frontend
npm install
cd ..

echo [ARCHITECT] All dependencies are up to date.
