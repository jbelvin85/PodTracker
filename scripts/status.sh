#!/bin/bash

# Navigate to the project root directory
cd "$(dirname "$0")/.."

# Check for .env file to ensure setup has been run
if [ ! -f "./.env" ]; then
    echo "Warning: .env file not found. Cannot display URLs. Please run './scripts/setup.sh' first." >&2
else
    # Source the .env file to get port variables
    export $(grep -v '^#' .env | xargs)
fi

echo "--- PodTracker Application Status ---"
echo ""
docker compose ps
echo ""
echo "Application services should be available at:"
echo "  - Frontend:      http://localhost:${FRONTEND_PORT:-5173}"
echo "  - Backend API:   http://localhost:${BACKEND_PORT:-3001}"
echo ""
echo "To view logs, run: 'docker compose logs -f'"
echo "To stop all services, run: 'docker compose down'"