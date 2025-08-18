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

# --- 2. Set Script Permissions ---
echo "2. Setting executable permissions for shell scripts..."
chmod +x ./scripts/*.sh
echo "   - Permissions set for .sh files in scripts/."


# --- 3. Define Default Environment Variables ---
# These will be written to the root .env file and used by docker-compose
# and to generate other .env files.
export POSTGRES_DB=${POSTGRES_DB:-podtracker}
export DB_PORT=${DB_PORT:-5432}
export TEST_DB_PORT=${TEST_DB_PORT:-5433}
export BACKEND_PORT=${BACKEND_PORT:-3001}
export FRONTEND_PORT=${FRONTEND_PORT:-5173}

# Prompt for PostgreSQL User
if [ -z "$POSTGRES_USER" ]; then
  read -p "Enter PostgreSQL username (default: postgres): " input_user
  export POSTGRES_USER=${input_user:-postgres}
fi

# Prompt for PostgreSQL Password
if [ -z "$POSTGRES_PASSWORD" ]; then
  read -s -p "Enter PostgreSQL password (default: postgres): " input_password
  export POSTGRES_PASSWORD=${input_password:-postgres}
  echo # Add a newline after the silent password input
fi

# Generate or prompt for JWT_SECRET
if [ -z "$JWT_SECRET" ]; then
  read -p "Generate a random JWT_SECRET? (y/N): " generate_jwt
  if [[ "$generate_jwt" =~ ^[yY]$ ]]; then
    export JWT_SECRET=$(openssl rand -base64 32)
    echo "Generated JWT_SECRET: ${JWT_SECRET}"
  else
    read -p "Enter JWT_SECRET: " input_jwt_secret
    export JWT_SECRET=${input_jwt_secret}
  fi
fi

# Generate or prompt for TEST_JWT_SECRET
if [ -z "$TEST_JWT_SECRET" ]; then
  read -p "Generate a random TEST_JWT_SECRET? (y/N): " generate_test_jwt
  if [[ "$generate_test_jwt" =~ ^[yY]$ ]]; then
    export TEST_JWT_SECRET=$(openssl rand -base64 32)
    echo "Generated TEST_JWT_SECRET: ${TEST_JWT_SECRET}"
  else
    read -p "Enter TEST_JWT_SECRET: " input_test_jwt_secret
    export TEST_JWT_SECRET=${input_test_jwt_secret}
  fi
fi

# --- 4. Create root .env file for Docker Compose ---
echo "3. Setting up root .env file for Docker Compose..."
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

# --- 5. Create application-specific .env files ---
echo "4. Setting up application-specific environment files..."
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

# --- 6. Install Node.js Dependencies ---
echo "5. Installing Node.js dependencies..."
npm install

# --- 7. Generate Prisma Client and Apply Migrations ---
echo "6. Generating Prisma Client and Applying Migrations..."
# For development, `prisma db push` is faster and creates the schema directly.
# For production, `prisma migrate deploy` is used to apply pending migrations.
# We'll use db push for initial setup and development convenience.
npx prisma db push --accept-data-loss

# Generate Prisma Client
npx prisma generate

echo ""
echo "--- ✅ Project Setup Complete! ---"

# Call the appropriate deploy script based on OS
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
  echo "Next step: Starting application deployment (Windows)..."
  powershell.exe -File ".\scripts\deploy.ps1"
else
  echo "Next step: Starting application deployment (Linux/macOS)..."
  ./scripts/deploy.sh
fi