# PodTracker

A modern, containerized PWA for tracking Magic: The Gathering Commander games, decks, and stats.

---

## 📋 Project Status

**Current Phase:** `Phase 1: Backend & Database Foundation`

The project is currently focused on building the core API, database schema, and user authentication systems. The foundational Docker environment and testing infrastructure are complete.

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
| **Backend**   | Node.js, Express, Zod                            |
| **Database**  | PostgreSQL, Prisma ORM                           |
| **Auth**      | JSON Web Tokens (JWT)                            |
| **Testing**   | Jest, Supertest                                  |
| **Infra**     | Docker, Docker Compose, Nginx (as reverse proxy) |

## 🚀 Getting Started

This project is fully containerized using Docker. Ensure you have **Docker Desktop** (or the Docker Engine/CLI) installed and running.

### 1. First-Time Setup

Clone the repository and run the initialization script. This will install all Node.js dependencies for the frontend and backend services and create the necessary `.env` files from the templates.

```bash
git clone <your-repo-url>
cd podtracker
./scripts/init-project.sh
```

### 2. Running the Application

Use Docker Compose to build the images and start all the services.

```bash
docker-compose up --build
```

The application services will be available at the following local addresses:

- **Frontend (React):** `http://localhost:5173`
- **Backend (Express API):** `http://localhost:3001`

## 🗺️ Project Roadmap

*For a more detailed breakdown of the tasks in each phase, see [docs/GOALS.md](./docs/GOALS.md).*

- [ ] **Phase 1: Backend & Database Foundation** *(In Progress)*
  - [x] Establish Docker Environment & Services
  - [x] Define Initial Database Schema (`User`, `Deck`, `Pod`)
  - [x] Configure Isolated Test Environment
  - [ ] Implement User Authentication (JWT)
  - [ ] Build Core CRUD APIs

- [ ] **Phase 2: Core Frontend Implementation**
  - [ ] Set up UI Framework, Routing, and Layout
  - [ ] Build Frontend Authentication Flow
  - [ ] Implement Views for Decks and Pods
  - [ ] Create Forms for Data Management

- [ ] **Phase 3: The Gameplay Loop**
  - [ ] Develop Game Setup Logic
  - [ ] Implement Live Game Tracking UI
  - [ ] Finalize Game Conclusion and Saving

- [ ] **Phase 4: Expansion, Analytics & Polish**
  - [ ] Create Player Statistics Dashboards
  - [ ] Implement PWA Offline Features
  - [ ] Add Social/Chat Features
  - [ ] Prepare for Production Deployment

## 📚 Project Documentation

This project uses the `docs/` directory as the single source of truth for planning and architecture. For more detailed information, please see:

- **docs/SUMMARY.md:** A complete breakdown of the tech stack, architecture, and project goals.
- **docs/GOALS.md:** A detailed outline of the development phases and feature roadmap.
- **docs/CHANGELOG.md:** A log of all notable changes to the project.