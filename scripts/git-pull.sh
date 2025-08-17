#!/bin/bash
set -e # Exit on error

# --- UI Configuration ---
if [ -t 1 ]; then
    RED='\033[0;31m'
    GREEN='\033[0;32m'
    YELLOW='\033[1;33m'
    BLUE='\033[0;34m'
    BOLD='\033[1m'
    NC='\033[0m' # No Color
else
    RED=''
    GREEN=''
    YELLOW=''
    BLUE=''
    BOLD=''
    NC=''
fi

# Function to print a formatted header
print_header() {
    echo -e "\n${BLUE}==> ${BOLD}$1${NC}"
}

# --- Script Logic ---
print_header "Fetching latest branches from remote..."
git fetch origin

print_header "Available remote branches:"
# Get remote branches, remove the leading spaces and 'origin/'
BRANCHES=($(git branch -r | sed 's/ *origin\///' | grep -v 'HEAD ->'))

# Present branches to the user
select BRANCH in "${BRANCHES[@]}"; do
    if [[ -n "$BRANCH" ]]; then
        break
    else
        echo -e "${RED}Invalid selection. Please choose a number from the list.${NC}"
    fi
done

print_header "Switching to branch '$BRANCH'..."
git checkout "$BRANCH"

print_header "Pulling latest changes for '$BRANCH'..."
git pull origin "$BRANCH"

print_header "Restarting application with new code..."
# Assuming deploy.sh handles everything (npm install, migrations, docker restart)
./scripts/deploy.sh

print_header "Success!"
echo -e "${GREEN}Branch '${BOLD}$BRANCH${NC}' has been updated and the application is restarting.${NC}"
