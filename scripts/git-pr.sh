#!/bin/bash
set -e # Exit on error

# Default to main if no argument is provided
BASE_BRANCH="${1:-main}"
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [ "$CURRENT_BRANCH" == "main" ] || [ "$CURRENT_BRANCH" == "develop" ]; then
  echo "Error: You should not create a PR from the main or develop branch."
  exit 1
fi

echo "Fetching latest changes from origin..."
git fetch origin

echo "Rebasing '$CURRENT_BRANCH' on top of 'origin/$BASE_BRANCH'..."
git rebase "origin/$BASE_BRANCH"

echo "Pushing '$CURRENT_BRANCH' to origin..."
git push origin "$CURRENT_BRANCH" --force-with-lease

echo "Branch '$CURRENT_BRANCH' is pushed and ready for a pull request against '$BASE_BRANCH'."
