#!/bin/bash

# Deploys the application to a remote server.
#
# Usage: ./scripts/deploy-to-server.sh user@your-server.com
#
# This script will:
# 1. Sync the project files to the remote server.
# 2. Execute a remote script to set up and start the application.

set -e

# --- 1. Configuration ---
REMOTE_USER_HOST=$1
PROJECT_DIR="/home/user/podtracker"

if [ -z "$REMOTE_USER_HOST" ]; then
    echo "Error: Remote user and host are required."
    echo "Usage: $0 user@your-server.com"
    exit 1
fi

echo "--- Deploying to ${REMOTE_USER_HOST} ---"

# --- 2. Sync Files ---
echo "Syncing project files to the server..."
rsync -avz --delete \
    --exclude=".git" \
    --exclude="node_modules" \
    --exclude="PodTracker(old).zip" \
    . "${REMOTE_USER_HOST}:${PROJECT_DIR}"

# --- 3. Execute Remote Setup ---
echo "Executing remote setup script..."
ssh "$REMOTE_USER_HOST" "cd ${PROJECT_DIR} && chmod +x ./scripts/*.sh && ./scripts/remote-setup.sh"

echo "--- ✅ Deployment to ${REMOTE_USER_HOST} complete! ---"
