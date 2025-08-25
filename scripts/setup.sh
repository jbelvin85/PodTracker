#!/bin/bash

# Ensure the scripts directory exists
mkdir -p scripts

echo "--- PodTracker Setup Script ---"

# Check for .env file in root
if [ ! -f ".env" ]; then
    echo "Creating .env from .env.example in root..."
    cp .env.example .env
else
    echo ".env already exists in root, skipping creation." 
fi

# Generate backend/.env
echo "Generating backend/.env..."
# Extract DATABASE_URL and JWT_SECRET from root .env
# Replace 'db:5432' with 'localhost:5432' for local backend development
DATABASE_URL_LOCAL=$(grep "^DATABASE_URL=" .env | sed 's/db:5432/localhost:5432/')
JWT_SECRET=$(grep "^JWT_SECRET=" .env)

echo "$DATABASE_URL_LOCAL" > backend/.env
echo "$JWT_SECRET" >> backend/.env
echo "NODE_ENV=development" >> backend/.env # Ensure NODE_ENV is set for backend
echo "PORT=$(grep "^BACKEND_PORT=" .env | cut -d'=' -f2)" >> backend/.env # Add BACKEND_PORT

# Generate frontend/.env
echo "Generating frontend/.env..."
# Extract VITE_API_BASE_URL and VITE_FRONTEND_PORT from root .env
VITE_API_BASE_URL=$(grep "^VITE_API_BASE_URL=" .env)
VITE_FRONTEND_PORT=$(grep "^VITE_FRONTEND_PORT=" .env)

echo "$VITE_API_BASE_URL" > frontend/.env
echo "$VITE_FRONTEND_PORT" >> frontend/.env


# Make all .sh scripts executable
echo "Making all .sh scripts in scripts/ directory executable..."
chmod +x scripts/*.sh

echo ""
echo "Setup complete. Please ensure Docker and Docker Compose are installed."
echo "If not, please install them manually. For Debian, you can follow the official Docker documentation:"
echo "https://docs.docker.com/engine/install/debian/"
echo "https://docs.docker.com/compose/install/"
echo ""
echo "After installing Docker and Docker Compose, you can run the application using: docker compose up -d"
