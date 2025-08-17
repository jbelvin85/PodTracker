#!/bin/bash

# This script is executed on the remote server to set up the application.

set -e

echo "--- Running Remote Setup ---"

# --- 1. Install Docker and Docker Compose ---
echo "Checking for Docker..."
if ! command -v docker &> /dev/null; then
    echo "Docker not found. Installing..."
    sudo apt-get update
    sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
    sudo apt-get update
    sudo apt-get install -y docker-ce
    sudo usermod -aG docker ${USER}
    echo "Docker installed successfully."
else
    echo "Docker is already installed."
fi

echo "Checking for Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    echo "Docker Compose not found. Installing..."
    sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    echo "Docker Compose installed successfully."
else
    echo "Docker Compose is already installed."
fi

# --- 2. Run Application Setup ---
echo "Running application setup..."
./scripts/setup.sh

# --- 3. Deploy Application ---
echo "Deploying application..."
./scripts/deploy.sh

echo "--- ✅ Remote Setup Complete ---"
