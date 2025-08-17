#!/bin/bash

echo "--- Initializing PodTracker Project (One-Time Setup) ---"

# Exit immediately if a command exits with a non-zero status.
set -e

# Navigate to the project root directory, so this script can be run from anywhere
cd "$(dirname "$0")/.."

# --- 1. Check for prerequisites ---
echo "1. Checking for prerequisites..."
if ! [ -x "$(command -v docker)" ]; then
  echo "Error: docker is not installed. Please install Docker Engine." >&2
  exit 1
fi

# Use 'docker compose' (with a space) which is the modern syntax
if ! docker compose version &> /dev/null; then
    echo "Error: docker compose is not available. Please install the Docker Compose plugin." >&2
    exit 1
fi

# --- 2. Define Default Environment Variables ---
# These will be written to the root .env file and used by docker-compose
# and to generate other .env files.
export POSTGRES_USER=${POSTGRES_USER:-postgres}
export POSTGRES_PASSWORD=${POSTGRES_PASSWORD:-postgres}
export POSTGRES_DB=${POSTGRES_DB:-podtracker}
export DB_PORT=${DB_PORT:-5432}
export TEST_DB_PORT=${TEST_DB_PORT:-5433}
export BACKEND_PORT=${BACKEND_PORT:-3001}
export FRONTEND_PORT=${FRONTEND_PORT:-5173}
export JWT_SECRET=${JWT_SECRET:-"a-super-secret-jwt-secret-for-development"}
export TEST_JWT_SECRET=${TEST_JWT_SECRET:-"a-super-secret-jwt-secret-for-testing"}

# --- 3. Create root .env file for Docker Compose ---
echo "2. Setting up root .env file for Docker Compose..."
if [ ! -f "./.env" ]; then
  cat > ./.env <<EOF
# --- Docker Compose Environment Variables ---

# PostgreSQL - Main Database
POSTGRES_USER=${POSTGRES_USER}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
POSTGRES_DB=${POSTGRES_DB}

# Port Mappings
DB_PORT=${DB_PORT}
TEST_DB_PORT=${TEST_DB_PORT}
BACKEND_PORT=${BACKEND_PORT}
FRONTEND_PORT=${FRONTEND_PORT}
EOF
  echo "   - Created ./.env file."
else
  echo "   - ./.env already exists. Skipping."
fi

# --- 4. Create application-specific .env files ---
echo "3. Setting up application environment files..."
if [ ! -f "./backend/.env" ]; then
  # Note: Inside Docker, the backend connects to the 'db' service on the default postgres port 5432.
  cat > ./backend/.env <<EOF
# PostgreSQL Database Connection (for backend service)
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}"

# JWT Secret for signing authentication tokens
JWT_SECRET="${JWT_SECRET}"
EOF
  echo "   - Created ./backend/.env"
else
  echo "   - ./backend/.env already exists. Skipping."
fi

if [ ! -f "./.env.test" ]; then
  # Note: For local testing, we connect to the port exposed on the host.
  cat > ./.env.test <<EOF
# PostgreSQL Database Connection (for local testing)
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${TEST_DB_PORT}/podtracker_test"

# JWT Secret for signing authentication tokens in tests
JWT_SECRET="${TEST_JWT_SECRET}"
EOF
  echo "   - Created ./.env.test"
else
  echo "   - ./.env.test already exists. Skipping."
fi

# --- 5. Install Node.js Dependencies ---
echo "4. Installing Node.js dependencies..."
npm install

# --- 6. Generate Prisma Client ---
echo "5. Generating Prisma Client..."
npx prisma generate

echo ""
echo "--- ✅ Project Setup Complete! ---"
echo "Next step: Run './scripts/deploy.sh' to build and start the application."