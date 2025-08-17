#!/bin/bash

echo "--- Initializing PodTracker Project ---"

# Exit immediately if a command exits with a non-zero status.
set -e

# --- 0. Check for prerequisites ---
echo "1. Checking for prerequisites (Docker)..."
if ! [ -x "$(command -v docker)" ]; then
  echo "Error: docker is not installed. Please install Docker Engine." >&2
  exit 1
fi

# Use 'docker compose' (with a space) which is the modern syntax
if ! docker compose version &> /dev/null; then
    echo "Error: docker compose is not available. Please install the Docker Compose plugin." >&2
    exit 1
fi

if ! command -v nc &> /dev/null; then
    echo "Warning: 'nc' (netcat) could not be found. The script will use a fixed delay to wait for the database." >&2
    echo "For a more reliable startup, please install netcat (e.g., 'sudo apt-get install netcat')." >&2
    WAIT_CMD="sleep"
else
    WAIT_CMD="nc"
fi

# --- 1. Define Default Environment Variables ---
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

# --- 2. Create root .env file for Docker Compose ---
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
  echo "Created ./.env file."
else
  echo "./.env already exists. Skipping creation."
fi

# --- 3. Install Node.js Dependencies ---
echo "3. Installing Node.js dependencies..."
npm install

# --- 4. Generate Prisma Client ---
echo "4. Generating Prisma Client..."
npx prisma generate

# --- 5. Create application-specific .env files ---
echo "5. Setting up application environment files..."
if [ ! -f "./backend/.env" ]; then
  # Note: Inside Docker, the backend connects to the 'db' service on the default postgres port 5432.
  cat > ./backend/.env <<EOF
# PostgreSQL Database Connection (for backend service)
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}"

# JWT Secret for signing authentication tokens
JWT_SECRET="${JWT_SECRET}"
EOF
  echo "Created ./backend/.env"
else
  echo "./backend/.env already exists. Skipping creation."
fi

if [ ! -f "./.env.test" ]; then
  # Note: For local testing, we connect to the port exposed on the host.
  cat > ./.env.test <<EOF
# PostgreSQL Database Connection (for local testing)
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:${TEST_DB_PORT}/podtracker_test"

# JWT Secret for signing authentication tokens in tests
JWT_SECRET="${TEST_JWT_SECRET}"
EOF
  echo "Created ./.env.test"
else
  echo "./.env.test already exists. Skipping creation."
fi

echo "--- Project Initialization Steps Complete ---"

# --- 6. Start Docker Services ---
echo "6. Building and starting Docker containers in the background..."
docker compose up --build -d

# --- 7. Wait for Databases to be Ready ---
echo "7. Waiting for databases to become available..."

wait_for_db() {
    local port=$1
    local db_name=$2
    echo "   - Waiting for ${db_name} on port ${port}..."
    if [ "$WAIT_CMD" = "nc" ]; then
        while ! nc -z localhost ${port}; do
            sleep 1
        done
    else
        # Fallback to a fixed sleep if nc is not available
        sleep 10
    fi
    echo "   - ${db_name} is ready."
}

wait_for_db ${DB_PORT} "Main DB"
wait_for_db ${TEST_DB_PORT} "Test DB"

# --- 8. Run Database Migrations ---
echo "8. Applying database migrations..."
npx prisma migrate dev --name init

# --- 9. Run Tests to Verify Setup ---
echo "9. Running backend tests to verify the environment..."
npm test

echo "--- ✅ PodTracker Environment is Up and Running! ---"
echo "The application services are running in the background."
echo "You can access them at:"
echo "  - Frontend:      http://localhost:${FRONTEND_PORT}"
echo "  - Backend API:   http://localhost:${BACKEND_PORT}"
echo "To view logs, run: 'docker compose logs -f'"
echo "To stop all services, run: 'docker compose down'"