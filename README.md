# PodTracker

A modern, containerized PWA for tracking Magic: The Gathering Commander games, decks, and stats.

---

## 📋 Project Status

**Current Phase:** `Phase 1: Backend & Database Foundation`

The project is currently focused on building the core API, database schema, and user authentication systems. The foundational Docker environment and testing infrastructure are in place, but full test execution is pending the completion of Docker installation.

---

## ✨ Features

The goal of PodTracker is to provide a complete toolkit for Commander players:

- **Pod Management:** Create and manage your playgroups ("Pods").
- **Deck Lists:** Keep a list of your decks, including commander data and links to external deckbuilding sites.
- **Game Tracking:** Set up and track games, including registered and guest users (the players), turn order, life totals, commander damage, poison counters, energy counters, start time, end time and timestamped logs of all game actions (adding or removing counters, passing turns, players leaving the game, adding notes, and game resoltuion ie how the game was won) for more in-depth game review.
- **Match History:** Record and review your entire game history with a turn-by-turn event log.
- **Player Statistics:** Analyze your performance, deck win-rates, and more.
- **Chat:** Pod-based group chat and direct messaging between users.
## 🛠️ Tech Stack

| Role          | Technology                                       |
|---------------|--------------------------------------------------|
| **Frontend**  | React, Vite, SWR, Tailwind CSS                   |
| **Backend**   | Node.js, Express, TypeScript, Zod                |
| **Database**  | PostgreSQL, Prisma ORM                           |
| **Auth**      | JSON Web Tokens (JWT)                            |
| **Testing**   | Jest, Supertest                                  |
| **Infra**     | Docker, Docker Compose, Nginx (as reverse proxy) |

## 🚀 Getting Started

This project is fully containerized using Docker. Ensure you have **Docker Desktop** (or the Docker Engine/CLI) installed and running.

### 1. First-Time Setup (Run Once)

Clone the repository and run the setup script. This will check for prerequisites, install all Node.js dependencies, and create the necessary `.env` configuration files.

```bash
git clone <your-repo-url>
cd podtracker
chmod +x ./scripts/*.sh
./scripts/setup.sh
```

### 2. Running the Application Locally

Use ./scripts/deploy.sh to launch Docker Compose to build the images and start all the services.


The application services will be available at the following local addresses:

- **Frontend (React):** `http://localhost:5173`
- **Backend (Express API):** `http://localhost:3001`

*Note: These ports are the defaults and can be configured in the root `.env` file after running the initialization script.*

### 3. Remote Deployment

The deployment process is now managed via Git. To deploy updates to a remote server, first push your feature branch to the remote repository using `./scripts/git-push.sh`.

Then, SSH into the server, navigate to the project directory, and run the interactive `git-pull.sh` script to pull the desired branch and restart the application containers:
```bash
ssh user@your-server.com
cd podtracker
./scripts/git-pull.sh
```

This script will guide you through selecting a branch and updating the application.

### 4. Developer Workflow Scripts

The `scripts/` directory contains helpers for common development tasks:

- **`./scripts/git-push.sh [base-branch]`**: Stages all changes, prompts for a commit message, and pushes the branch to the remote repository. It rebases onto the target branch (default: `main`) to ensure a clean history.
- **`./scripts/git-pull.sh`**: An interactive script to be run on the server to pull the latest changes for a specific branch and restart the application.
- **`./scripts/deploy.sh`**: A convenience script that runs `docker-compose up --build` for local development.
- **`./scripts/get_timestamp.sh` / `.ps1`**: Returns a standardized timestamp string (`YYYY-MM-DD-HH-MM-SS`) for use in other scripts.

Make sure scripts are executable by running `chmod +x ./scripts/*.sh`.

## 5. Project Roadmap

*For a more detailed breakdown of the tasks in each phase, see [docs/GOALS.md](./docs/GOALS.md).*

- [ ] **Phase 1: Backend & Database Foundation** *(In Progress)*
  - [x] Establish Docker Environment & Services
  - [x] Define Initial Database Schema (`User`, `Deck`, `Pod`)
  - [x] Configure Isolated Test Environment (Test execution pending Docker installation)
  - [ ] Implement User Authentication (JWT)
  - [ ] Build Core CRUD APIs

- [ ] **Phase 2: Core Frontend Implementation**
  - [ ] Set up UI Framework, Routing, and Layout
  - [ ] Build Frontend Authentication Flow
  - [ ] Data Display: Build the primary views for displaying a user's decks and pods.
  - [ ] Data Management: Implement forms and components for creating and editing decks and pods, connecting them to the backend API via SWR.

- [ ] **Phase 3: The Gameplay Loop**
  - [ ] Game Setup: Develop the UI and backend logic for creating a new game from a pod of players and their chosen decks.
  - [ ] Live Game Tracking: Implement the interface for tracking life totals, commander damage, and other in-game events.
  - [ ] Game Conclusion: Finalize the logic for ending a game, determining a winner, and saving the results.

- [ ] **Phase 4: Expansion, Analytics & Polish**
  - [ ] Player Statistics: Create dashboards and views to analyze match history, deck performance, and win/loss rates.
  - [ ] PWA Features: Implement service workers for offline capabilities and add a web app manifest for "install to homescreen" functionality.
  - [ ] Social Features: Implement pod-based group chat and direct messaging.
  - [ ] UI Polish: Refine the user interface and experience based on user feedback.
  - [ ] Deployment: Prepare the application for a production environment.

## 📚 Project Documentation

This project uses the `docs/` directory as the single source of truth for planning and architecture. For more detailed information, please see:

- **docs/PROJECT.md:** A machine-readable summary of the project's status, architecture, and goals.
- **docs/SUMMARY.md:** A complete breakdown of the tech stack, architecture, and project goals.
- **docs/GOALS.md:** A detailed outline of the development phases and feature roadmap.
- **docs/CHANGELOG.md:** A log of all notable changes to the project.
- **docs/LEARNING_JOURNAL.md:** A living textbook for practical PWA development, using this project as a real-world example.

## 6. Contribution Guidelines

To ensure a consistent and stable development process, this project utilizes a **feature branching workflow**. All new features, bug fixes, and significant changes should be developed on dedicated feature branches. For detailed guidelines on our branching strategy and development workflow, please refer to [docs/DIRECTIVE.md](./docs/DIRECTIVE.md).