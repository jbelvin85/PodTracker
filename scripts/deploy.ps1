# PowerShell script for deploying PodTracker Project (Windows)

Write-Host "--- Deploying PodTracker Project ---"

# Exit immediately if a command exits with a non-zero status.
$ErrorActionPreference = "Stop"

# Navigate to the project root directory, so this script can be run from anywhere
Set-Location (Join-Path (Split-Path $MyInvocation.MyCommand.Path) "..")

# --- 1. Build Docker Images ---
Write-Host "1. Building Docker Images..."
docker compose build

# --- 2. Bring up Docker Containers ---
Write-Host "2. Bringing up Docker Containers..."
docker compose up -d

Write-Host ""
Write-Host "--- ✅ Deployment Complete! ---"
Write-Host "PodTracker services are now running in the background."
Write-Host "You can access the backend API at http://localhost:$($env:BACKEND_PORT)"
Write-Host "You can access the frontend UI at http://localhost:$($env:FRONTEND_PORT)"
Write-Host "To stop the services, run 'docker compose down' in the project root."