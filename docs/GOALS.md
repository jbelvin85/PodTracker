# PodTracker Project Goals

## Current Task
- **Backend:** Finalize and test User Authentication.

This document outlines the development goals for recreating and expanding upon the original PodTracker application. Our objective is to build a modern, robust, and scalable PWA using the technology stack defined in `docs/SUMMARY.md`.

## Guiding Principles

- **Modern Stack:** Fully leverage the chosen tech stack (React, Express, PostgreSQL, Docker) for a better development experience and a more performant application.
- **Fresh Foundation First** The initial goal is to build a stable and functional foundation for our entire project
- **Expand and Improve:** Once a new foundation is reached, we will focus on expanding features, improving the user experience, and ensuring the application is scalable.

---

## Development Phases

We will approach development in distinct phases to ensure a structured and manageable workflow.

### Phase 1: Backend & Database Foundation (Current Focus)

The goal of this phase is to build the core data structures, API endpoints, and containerized development environment that will power the application.
- **[x] Database Schema:** Define the complete Prisma schema for all core models. (Initial `User`, `Deck`, and `Pod` models complete).
- **[ ] Docker Environment:** Containerize the backend and database for consistent local development.
  - **[ ]** Create Dockerfile for backend service (Node.js + dependencies).
  - **[ ]** Define docker-compose.yml with services for backend and postgres.
  - **[ ]** Configure persistent database volumes for Postgres.
  - **[ ]** Add environment variable handling (.env.docker).
  - **[ ]** Create helper scripts (docker-up.sh, docker-down.sh, docker-rebuild.sh) for common workflows.
  - **[ ]** Verify Prisma migrations and testing run successfully inside containers.

- **[ ] User Authentication:** Implement secure user registration and login endpoints using JWT.
  - **[x]** Implement registration/login controller logic.
  - **[x]** Add Zod validation for auth endpoints.
  - **[x]** Add JWT-based route protection middleware.
- **[ ] Core CRUD APIs:** Create and test the API endpoints for managing Users, Decks, and Pods.
- **[x] Testing Environment:** Establish a robust testing setup for the backend using Jest and Supertest. (Test database infrastructure configured. **Note: Test execution is currently blocked by pending Docker installation.**).

### Phase 2: Core Frontend Implementation

With the backend APIs in place, we will build the user-facing components to interact with them.

- **[ ] UI/UX Framework:** Set up basic application layout, routing, and navigation.
- **[ ] Authentication Flow:** Create the login, registration, and logout flows on the frontend.
- **[ ] Data Display:** Build the primary views for displaying a user's decks and pods.
- **[ ] Data Management:** Implement forms and components for creating and editing decks and pods, connecting them to the backend API via SWR.

### Phase 3: The Gameplay Loop

This phase focuses on the application's primary feature: tracking games.

- **[ ] Game Setup:** Develop the UI and backend logic for creating a new game from a pod of players and their chosen decks.
- **[ ] Live Game Tracking:** Implement the interface for tracking life totals, commander damage, and other in-game events.
- **[ ] Game Conclusion:** Finalize the logic for ending a game, determining a winner, and saving the results.

### Phase 4: Expansion, Analytics & Polish

Once the core functionality is complete and stable, we will enhance the application.

- **[ ] Player Statistics:** Create dashboards and views to analyze match history, deck performance, and win/loss rates.
- **[ ] PWA Features:** Implement service workers for offline capabilities and add a web app manifest for "install to homescreen" functionality.
- **[ ] Social Features:** Implement pod-based group chat and direct messaging.
- **[ ] UI Polish:** Refine the user interface and experience based on user feedback.
- **[ ] Deployment:** Prepare the application for a production environment.
