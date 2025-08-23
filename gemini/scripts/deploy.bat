@echo off
SETLOCAL

REM Navigate to the project root
cd /d "%~dp0..\.."

echo "Stopping existing Docker Compose services..."
docker-compose down

echo "Starting Docker Compose services with a fresh build..."
docker-compose up --build -d

IF %ERRORLEVEL% NEQ 0 (
  echo "Error: Docker Compose failed to start services. Check logs for details."
) ELSE (
  echo.
  echo "PodTracker is up and running!"
  echo "Access the application at: http://localhost:8000"
  echo "To stop the application, run 'docker-compose down' in the project root."
)

ENDLOCAL