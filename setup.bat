@echo off
REM The Architect: Laying the foundation for PodTracker.
echo [ARCHITECT] Initializing project setup...

REM Step 1: Environment Variables
echo [ARCHITECT] Checking for .env files...
if not exist .env (
    echo [ARCHITECT] WARNING: Root .env file not found. Copying from .env.example.
    copy .env.example .env
)
if not exist backend\.env (
    echo [ARCHITECT] WARNING: Backend .env file not found. Copying from backend\.env.example.
    copy backend\.env.example backend\.env
)
echo [ARCHITECT] Environment files checked. Please review and configure them.

REM Step 2: Install Dependencies
echo [ARCHITECT] Installing root dependencies...
CALL npm install

echo [ARCHITECT] Installing backend dependencies...
cd backend
CALL npm install
cd ..

echo [ARCHITECT] Installing frontend dependencies...
cd frontend
CALL npm install
cd ..

REM Step 3: Prisma Client Generation
echo [ARCHITECT] Generating Prisma client...
cd backend
CALL npx prisma generate
cd ..

REM Step 4: Docker Image Construction
echo [ARCHITECT] Building Docker containers...
docker-compose build

echo [ARCHITECT] Foundation is set. The project is ready for deployment.
