@echo off
REM The Architect: Laying the foundation for PodTracker.
setlocal

:main_menu
cls
echo [ARCHITECT] PodTracker Project Setup Menu
echo =========================================
echo.
echo  1. Generate/Update .env Files
echo  2. Install All Dependencies
echo  3. Generate Prisma Client
echo.
echo  4. Run Full Setup (Steps 1-3)
echo.
echo  5. Exit
echo.
set /p choice="Select an option [1-5]: "

if /i "%choice%"=="1" (call :generate_env & pause & goto :main_menu)
if /i "%choice%"=="2" (call :install_deps & pause & goto :main_menu)
if /i "%choice%"=="3" (call :prisma_generate & pause & goto :main_menu)
if /i "%choice%"=="4" (call :full_setup & pause & goto :main_menu)
if /i "%choice%"=="5" (goto :eof)

echo Invalid choice. Please try again.
pause
goto :main_menu

:generate_env
    echo [ARCHITECT] Step 1: Generating Environment Variables...
    if not exist .env (
        echo [ARCHITECT] Root .env file not found. Copying from .env.example...
        copy .env.example .env
    ) else (
        echo [ARCHITECT] Root .env file already exists.
    )
    
    echo [ARCHITECT] Generating backend\.env from root .env...
    for /f "usebackq tokens=1* delims==" %%a in (`findstr /b "DATABASE_URL=" .env`) do set "DATABASE_URL_LOCAL=%%b"
    set "DATABASE_URL_LOCAL=%DATABASE_URL_LOCAL:db:5432=localhost:5432%"
    for /f "usebackq tokens=1* delims==" %%a in (`findstr /b "JWT_SECRET=" .env`) do set "JWT_SECRET_VAL=%%b"
    for /f "usebackq tokens=1* delims==" %%a in (`findstr /b "BACKEND_PORT=" .env`) do set "BACKEND_PORT_VAL=%%b"
    
    (
        echo DATABASE_URL=%DATABASE_URL_LOCAL%
        echo JWT_SECRET=%JWT_SECRET_VAL%
        echo NODE_ENV=development
        echo PORT=%BACKEND_PORT_VAL%
    ) > backend\.env
    
    echo [ARCHITECT] Generating frontend\.env from root .env...
    for /f "usebackq tokens=1* delims==" %%a in (`findstr /b "VITE_API_BASE_URL=" .env`) do set "VITE_API_BASE_URL_VAL=%%b"
    for /f "usebackq tokens=1* delims==" %%a in (`findstr /b "VITE_FRONTEND_PORT=" .env`) do set "VITE_FRONTEND_PORT_VAL=%%b"
    
    (
        echo VITE_API_BASE_URL=%VITE_API_BASE_URL_VAL%
        echo VITE_FRONTEND_PORT=%VITE_FRONTEND_PORT_VAL%
    ) > frontend\.env
    
    echo [ARCHITECT] Environment files generated. Please review them if necessary.
    goto :eof

:install_deps
    echo [ARCHITECT] Step 2: Installing All Dependencies...
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
    echo [ARCHITECT] All dependencies installed.
    goto :eof

:prisma_generate
    echo [ARCHITECT] Step 3: Generating Prisma Client...
    cd backend
    CALL npx prisma generate
    cd ..
    echo [ARCHITECT] Prisma client generated.
    goto :eof

:full_setup
    call :generate_env
    call :install_deps
    call :prisma_generate
    echo.
    echo [ARCHITECT] Full setup sequence complete. The project is ready.
    goto :eof
