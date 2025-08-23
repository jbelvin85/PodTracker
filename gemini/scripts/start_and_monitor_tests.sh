#!/bin/bash

# Navigate to the project root
cd "$(dirname "$0")/../.."

echo "Starting Docker Compose services for testing..."
docker-compose up -d db

if [ $? -ne 0 ]; then
  echo "Error: Docker Compose failed to start database. Exiting."
  exit 1
fi

echo "Waiting for database to be ready..."
# A simple wait, more robust solutions might involve a loop checking database connection
sleep 5

echo "Running backend tests..."
# Navigate to the backend directory to run tests
cd backend

npm test

test_exit_code=$?

# Navigate back to the project root
cd ..

if [ $test_exit_code -ne 0 ]; then
  echo "Tests failed with exit code $test_exit_code."
else
  echo "All tests passed successfully."
fi

echo "To stop the database service, run: docker-compose down"

exit $test_exit_code