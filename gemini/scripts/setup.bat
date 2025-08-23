@echo off
SETLOCAL

REM Navigate to the project root
cd /d "%~dp0..\.."

echo "Running initial setup for PodTracker..."

REM --- Backend Setup ---
echo.
echo "Setting up backend..."
cd backend

IF NOT EXIST .env (
  echo "Creating backend/.env from .env.example..."
  COPY .env.example .env
) ELSE (
  echo "backend/.env already exists. Skipping creation."
)

echo "Installing backend dependencies..."
npm install

echo "Running Prisma migrations and generating client..."
npx prisma migrate dev --name init --skip-generate
npx prisma generate

cd ..

REM --- Frontend Setup ---
echo.
echo "Setting up frontend..."
cd frontend

IF NOT EXIST .env (
  echo "Creating frontend/.env from .env.example..."
  REM Frontend typically doesn't need a .env, but including for consistency if it ever does
  COPY .env.example .env
) ELSE (
  echo "frontend/.env already exists. Skipping creation."
)

echo "Installing frontend dependencies..."
npm install

cd ..

echo.
echo "PodTracker setup complete!"
echo "You can now run 'deploy.bat' to start the application."

ENDLOCAL