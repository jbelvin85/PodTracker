#!/bin/bash

echo "--- PodTracker Deployment Script (Local Development) ---"

# Run docker compose up with build to ensure all services are up-to-date
docker compose up --build -d --remove-orphans

if [ $? -eq 0 ]; then
    echo "
PodTracker services are starting in the background."
    echo "Attempting to run database migrations..."
    docker compose exec backend ./migrate.sh
    echo "Finished attempting database migrations."
    echo "Frontend: http://localhost:5173"
    echo "Backend:  http://localhost:3001"

    
    echo "
Use 'docker compose logs -f' to view service logs."
    echo "Use 'docker compose down' to stop services."
else
    echo "
Error: Docker Compose failed to start services."
    echo "Please check your Docker installation and configuration."
fi
