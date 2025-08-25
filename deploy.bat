@echo off
REM The Architect: Orchestrating the deployment of PodTracker.
setlocal

:main_menu
cls
echo [ARCHITECT] PodTracker Development Control Panel
echo ================================================
echo.
echo  --- Application Management ---
echo  1. Build ^& Launch All Services (Full Restart)
echo  2. Launch Services (No Rebuild)
echo  3. Stop All Services
echo  4. View Service Status
echo  5. View Service Logs (Follow)
echo.
echo  --- Database ^& Maintenance ---
echo  6. Run Database Migrations
echo  7. Seed Database
echo  8. Prune Docker System (Images, Containers, Networks)
echo.
echo  --- Development ^& Testing ---
echo  9. Run Backend Tests
echo  10. Open Shell in Backend Container
echo  11. Install/Update Dependencies
echo.
echo  12. Exit
echo.
set /p choice="Select an option [1-12]: "

if /i "%choice%"=="1" (call :launch_build & pause & goto :main_menu)
if /i "%choice%"=="2" (call :launch_nobuild & pause & goto :main_menu)
if /i "%choice%"=="3" (call :stop_services & pause & goto :main_menu)
if /i "%choice%"=="4" (call :view_status & pause & goto :main_menu)
if /i "%choice%"=="5" (call :view_logs & goto :main_menu)
if /i "%choice%"=="6" (call :migrate_db & pause & goto :main_menu)
if /i "%choice%"=="7" (call :seed_db & pause & goto :main_menu)
if /i "%choice%"=="8" (call :prune_docker & pause & goto :main_menu)
if /i "%choice%"=="9" (call :run_tests & pause & goto :main_menu)
if /i "%choice%"=="10" (call :open_shell & goto :main_menu)
if /i "%choice%"=="11" (call :install_deps & pause & goto :main_menu)
if /i "%choice%"=="12" (goto :eof)

echo Invalid choice. Please try again.
pause
goto :main_menu

:launch_build
    echo [ARCHITECT] Bringing services online with a fresh build...
    docker-compose up -d --build
    echo [ARCHITECT] PodTracker is now live.
    goto :eof

:launch_nobuild
    echo [ARCHITECT] Bringing services online without rebuilding...
    docker-compose up -d
    echo [ARCHITECT] PodTracker is now live.
    goto :eof

:stop_services
    echo [ARCHITECT] Stopping all services...
    docker-compose down
    echo [ARCHITECT] All services stopped.
    goto :eof

:view_status
    echo [ARCHITECT] Current service status:
    docker-compose ps
    goto :eof

:view_logs
    echo [ARCHITECT] Tailing logs for all services. Press CTRL+C to stop.
    docker-compose logs -f
    goto :eof

:migrate_db
    echo [ARCHITECT] Applying database migrations...
    docker-compose run --rm backend sh -c "npx prisma migrate deploy"
    echo [ARCHITECT] Migrations applied.
    goto :eof

:seed_db
    echo [ARCHITECT] Seeding the database...
    REM Note: This requires a seed script to be configured in your package.json and prisma/seed.ts
    docker-compose run --rm backend sh -c "npx prisma db seed"
    echo [ARCHITECT] Database seeding complete.
    goto :eof

:install_deps
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
    goto :eof

:prune_docker
    echo [ARCHITECT] WARNING: This will remove all stopped containers, unused networks, and dangling images.
    set /p confirm="Are you sure you want to continue? (y/n): "
    if /i not "%confirm%"=="y" (
        echo [ARCHITECT] Prune operation cancelled.
        goto :eof
    )
    docker system prune
    echo [ARCHITECT] Docker system pruned.
    goto :eof

:run_tests
    echo [ARCHITECT] Running backend tests...
    docker-compose run --rm backend sh -c "npm test"
    echo [ARCHITECT] Tests finished.
    goto :eof

:open_shell
    echo [ARCHITECT] Opening an interactive shell in the backend container...
    echo [ARCHITECT] Type 'exit' to return to the menu.
    docker-compose exec backend sh
    goto :eof
