#!/bin/bash

echo "--- Initializing PodTracker Project ---"

# Exit immediately if a command exits with a non-zero status.
set -e

# --- 1. Install Node.js Dependencies ---
echo "1. Installing Node.js dependencies..."
npm install

# --- 2. Generate Prisma Client ---
echo "2. Generating Prisma Client..."
npx prisma generate

# --- 3. Create .env files from templates (if they don't exist) ---
echo "3. Setting up environment files..."
if [ ! -f "./backend/.env" ]; then
  echo "# PostgreSQL Database Connection" > ./backend/.env
  echo "DATABASE_URL=\"postgresql://postgres:postgres@localhost:5432/podtracker\"" >> ./backend/.env
  echo "" >> ./backend/.env
  echo "# JWT Secret for signing authentication tokens" >> ./backend/.env
  echo "JWT_SECRET=\"a-super-secret-jwt-secret-for-development\"" >> ./backend/.env
  echo "Created ./backend/.env with default values. Please review and update if necessary."
else
  echo "./backend/.env already exists. Skipping creation."
fi

if [ ! -f "./.env.test" ]; then
  echo "# PostgreSQL Database Connection for Testing" > ./.env.test
  echo "DATABASE_URL=\"postgresql://postgres:postgres@localhost:5432/podtracker_test\"" >> ./.env.test
  echo "" >> ./.env.test
  echo "# JWT Secret for signing authentication tokens in tests" >> ./.env.test
  echo "JWT_SECRET=\"a-super-secret-jwt-secret-for-testing\"" >> ./.env.test
  echo "Created ./.env.test with default values. Please review and update if necessary."
else
  echo "./.env.test already exists. Skipping creation."
fi

echo "--- Project Initialization Complete ---"
echo "Next steps:"
echo "1. Ensure Docker Desktop is running."
echo "2. Start the application services: docker-compose up --build"
echo "3. Run Prisma migrations (after services are up): npx prisma migrate dev"
echo "4. Run tests: npm test"