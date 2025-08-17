#!/bin/bash
set -e # Exit on error

# --- UI Configuration ---
# Use colors for better readability, but only if the terminal supports it
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

# Default to main if no argument is provided
BASE_BRANCH="${1:-main}"
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

print_header "Preparing Pull Request for branch '$CURRENT_BRANCH'"

# --- Pre-flight Checks ---
if [ "$CURRENT_BRANCH" == "main" ] || [ "$CURRENT_BRANCH" == "develop" ]; then
  echo -e "${RED}Error: You cannot run this script from the '$CURRENT_BRANCH' branch.${NC}"
  exit 1
fi

if ! git diff-index --quiet HEAD --; then
    echo -e "${RED}Error: You have uncommitted changes.${NC}"
    echo "Please commit or stash them before preparing the pull request."
    exit 1
fi

# --- Confirmation ---
echo -e "\nThis script will perform the following actions:"
echo -e "  1. ${YELLOW}Rebase${NC} your current branch '${BOLD}$CURRENT_BRANCH${NC}' onto the latest '${BOLD}origin/$BASE_BRANCH${NC}'."
echo -e "  2. ${YELLOW}Force-push (with lease)${NC} the updated branch to origin."
echo -e "\nThis will ${RED}rewrite the history${NC} of your remote branch."

read -p "Are you sure you want to continue? (y/n) " -n 1 -r
echo # move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "\n${YELLOW}Operation cancelled by user.${NC}"
    exit 1
fi

# --- Execution ---
print_header "Fetching latest changes from origin"
git fetch origin

print_header "Rebasing '$CURRENT_BRANCH' on top of 'origin/$BASE_BRANCH'"
if ! git rebase "origin/$BASE_BRANCH"; then
    echo -e "\n${RED}Automatic rebase failed.${NC}"
    echo -e "Please resolve the conflicts and then run: ${YELLOW}git rebase --continue${NC}"
    echo -e "After the rebase is complete, run this command to push: ${YELLOW}git push origin \"$CURRENT_BRANCH\" --force-with-lease${NC}"
    exit 1
fi

print_header "Pushing '$CURRENT_BRANCH' to origin"
git push origin "$CURRENT_BRANCH" --force-with-lease

print_header "Success!"
echo -e "${GREEN}Branch '${BOLD}$CURRENT_BRANCH${NC}' is up-to-date with '${BOLD}$BASE_BRANCH${NC}' and ready for a pull request.${NC}"
