@echo off
REM The Architect: A simplified script to reliably start PodTracker.
REM This stops all services, rebuilds them, and launches them in the background.
setlocal

echo [ARCHITECT] Stopping all services...
docker-compose down

echo.
echo [ARCHITECT] Bringing services online with a fresh build...
docker-compose up -d --build

IF %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ARCHITECT] ERROR: Docker Compose failed to start.
    echo [ARCHITECT] Please check the output above for error messages.
) ELSE (
    echo.
    echo [ARCHITECT] PodTracker is now live.
    echo [ARCHITECT] Access the application using the APP_PORT defined in your .env file.
    echo [ARCHITECT] (Default: http://localhost:8000)
)

echo.
echo Press any key to exit...
pause >nul
