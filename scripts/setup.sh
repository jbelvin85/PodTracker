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


# --- 3. Set up .env file ---
echo "3. Setting up .env file..."
if [ ! -f "./.env" ]; then
  if [ -f "./.env.example" ]; then
    cp ./.env.example ./.env
    echo "   - Created ./.env from ./.env.example."
    echo "   - Please review and edit the ./.env file with your specific configurations."
  else
    echo "Error: ./.env.example not found. Cannot create ./.env." >&2
    exit 1
  fi
else
  echo "   - ./.env already exists. Skipping creation."
  echo "   - Please ensure your ./.env file contains all necessary variables from ./.env.example."
fi

# --- 4. Configure Environment Variables in .env ---
echo "4. Configuring environment variables in ./.env..."

# Function to update a variable in .env
update_env_var() {
  local var_name=$1
  local new_value=$2
  if grep -q "^${var_name}=" ./.env; then
    # Variable exists, update it
    sed -i "/^${var_name}=/c\\${var_name}=${new_value}" ./.env
  else
    # Variable does not exist, append it
    echo "${var_name}=${new_value}" >> ./.env
  fi
}

# Prompt for PostgreSQL User
if [ -z "$(grep '^POSTGRES_USER=' ./.env | cut -d'=' -f2)" ] || [ "$(grep '^POSTGRES_USER=' ./.env | cut -d'=' -f2)" == "postgres" ]; then
  read -p "Enter PostgreSQL username (default: postgres): " input_user
  POSTGRES_USER_VAL=${input_user:-postgres}
  update_env_var "POSTGRES_USER" "${POSTGRES_USER_VAL}"
fi

# Prompt for PostgreSQL Password
if [ -z "$(grep '^POSTGRES_PASSWORD=' ./.env | cut -d'=' -f2)" ] || [ "$(grep '^POSTGRES_PASSWORD=' ./.env | cut -d'=' -f2)" == "password" ]; then
  read -s -p "Enter PostgreSQL password (default: postgres): " input_password
  POSTGRES_PASSWORD_VAL=${input_password:-postgres}
  update_env_var "POSTGRES_PASSWORD" "${POSTGRES_PASSWORD_VAL}"
  echo # Add a newline after the silent password input
fi

# Generate or prompt for JWT_SECRET
if [ -z "$(grep '^JWT_SECRET=' ./.env | cut -d'=' -f2)" ] || [ "$(grep '^JWT_SECRET=' ./.env | cut -d'=' -f2)" == "your_super_secret_jwt_key_here" ]; then
  read -p "Generate a random JWT_SECRET? (y/N): " generate_jwt
  if [[ "$generate_jwt" =~ ^[yY]$ ]]; then
    JWT_SECRET_VAL=$(openssl rand -base64 32)
    echo "Generated JWT_SECRET: ${JWT_SECRET_VAL}"
  else
    read -p "Enter JWT_SECRET: " input_jwt_secret
    JWT_SECRET_VAL=${input_jwt_secret}
  fi
  update_env_var "JWT_SECRET" "${JWT_SECRET_VAL}"
fi

# --- 5. Install Node.js Dependencies ---
echo "5. Installing Node.js dependencies..."
npm install

# --- 6. Generate Prisma Client and Apply Migrations ---
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
  ./scripts\deploy.sh
fi