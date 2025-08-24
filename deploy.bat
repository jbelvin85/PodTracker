@echo off
REM The Architect: Orchestrating the deployment of PodTracker.
echo [ARCHITECT] Starting deployment sequence...

REM Step 1: Install Host Dependencies
call install-deps.bat

REM Step 2: Database Migration
echo [ARCHITECT] Applying database migrations...
docker-compose run --rm backend sh migrate.sh

REM Step 3: Launching Services
echo [ARCHITECT] Bringing services online...
docker-compose up -d --build

echo [ARCHITECT] PodTracker is now live.
