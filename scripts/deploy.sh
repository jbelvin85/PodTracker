#!/bin/bash

echo "--- Deploying PodTracker Application ---"

# Exit immediately if a command exits with a non-zero status.
# Print each command to stdout before executing it.
set -e
set -x

# Navigate to the project root directory
cd "$(dirname "$0")/.."
echo "--- CWD: $(pwd) ---"

# Check for .env file to ensure setup has been run
if [ ! -f "./.env" ]; then
    echo "Error: .env file not found. Please run './scripts/setup.sh' first." >&2
    exit 1
fi

# Source the .env file to get port variables
export $(grep -v '^#' .env | xargs)

# Source the backend/.env file for DATABASE_URL for Prisma migrations
export $(grep -v '^#' backend/.env | xargs)

if ! command -v nc &> /dev/null; then
    echo "Warning: 'nc' (netcat) could not be found. The script will use a fixed delay to wait for the database." >&2
    echo "For a more reliable startup, please install netcat (e.g., 'sudo apt-get install netcat')." >&2
    WAIT_CMD="sleep"
else
    WAIT_CMD="nc"
fi

# --- 1. Start Docker Services ---
echo "1. Verifying backend Dockerfile existence..."
ls -la ./backend

echo "2. Building and starting Docker containers in the background..."
if ! docker compose up --build -d; then
    echo "--- ERROR: Docker Compose build failed. ---" >&2
    exit 1
fi

# --- 2. Wait for Databases to be Ready ---
echo "3. Waiting for databases to become available..."

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

# --- 3. Run Database Migrations ---
echo "4. Applying database migrations..."
npx prisma migrate dev --name init

# --- 4. Run Tests to Verify Setup ---
echo "5. Running backend tests to verify the environment..."
npm test

echo ""
echo "--- ✅ PodTracker Environment is Up and Running! ---"
echo "Run './scripts/status.sh' to see container status and URLs."