# Contributing to PodTracker

First off, thank you for considering contributing to PodTracker! It's people like you that make open source such a great community.

This document provides guidelines for contributing to the project. Please feel free to propose changes to this document in a pull request.

## Code of Conduct

This project and everyone participating in it is governed by a Code of Conduct. By participating, you are expected to uphold this code. (Note: A formal CODE_OF_CONDUCT.md file can be added later).

## How Can I Contribute?

### Reporting Bugs

Bugs are tracked as GitHub issues. When you are creating a bug report, please include as many details as possible.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues.

## Development Workflow

To ensure a structured and stable development process, PodTracker utilizes a **feature branching workflow**. All new features, bug fixes, and significant changes are developed on dedicated branches, which are then integrated into the `main` branch after review.

### Branching Strategy

-   **Feature Branches:** All new work must be on a dedicated feature branch created from `main`.
-   **Naming:** Branches should be named descriptively (e.g., `feature/add-user-auth`, `bugfix/login-issue`).
-   **Integration:** Features are integrated into `main` via Pull Requests (PRs).

### Remote Deployment

The deployment process to a remote server is managed via Git. To deploy updates, first push your feature branch to the remote repository using `./scripts/git-push.sh`.

Then, SSH into the server, navigate to the project directory, and run the interactive `git-pull.sh` script to pull the desired branch and restart the application containers:
```bash
ssh user@your-server.com
cd podtracker
./scripts/git-pull.sh
```

This script will guide you through selecting a branch and updating the application.

### Developer Workflow Scripts

The `scripts/` directory contains helpers for common development tasks:

- **`./scripts/git-push.sh [base-branch]`**: Stages all changes, prompts for a commit message, and pushes the branch to the remote repository. It rebases onto the target branch (default: `main`) to ensure a clean history.
- **`./scripts/git-pull.sh`**: An interactive script to be run on the server to pull the latest changes for a specific branch and restart the application.
- **`./scripts/deploy.sh`**: A convenience script that runs `docker-compose up --build` for local development.
- **`./scripts/get_timestamp.sh` / `.ps1`**: Returns a standardized timestamp string (`YYYY-MM-DD-HH-MM-SS`) for use in other scripts.

Make sure scripts are executable by running `chmod +x ./scripts/*.sh`.

### Pull Request Process

1.  Ensure any install or build dependencies are removed before the end of the layer when doing a build.
2.  Update the `README.md` and other relevant documentation with details of changes to the interface.
3.  Increase the version numbers in any examples and the `package.json` files to the new version that this Pull Request would represent.
4.  You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.