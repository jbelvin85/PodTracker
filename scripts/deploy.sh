#!/bin/bash

echo "--- Deploying PodTracker Project ---"

# Exit immediately if a command exits with a non-zero status.
set -e

# Navigate to the project root directory, so this script can be run from anywhere
cd "$(dirname "$0")/.."

# Build Docker Images
echo "1. Building Docker Images..."
docker compose build

# Bring up Docker Containers
echo "2. Bringing up Docker Containers..."
docker compose up -d

echo "3. Running Prisma Migrations..."
docker compose exec backend npx prisma migrate deploy

echo "4. Running Backend Tests..."
docker compose exec backend npm test

echo ""
echo "--- ✅ Deployment Complete! ---"
echo "PodTracker services are now running in the background."
echo "You can access the backend API at http://localhost:${BACKEND_PORT}"
echo "You can access the frontend UI at http://localhost:${FRONTEND_PORT}"
echo "To stop the services, run 'docker compose down' in the project root."