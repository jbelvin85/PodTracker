# PodTracker Project Roadmap

This document outlines the development roadmap for the PodTracker application. The phases and tasks directly correspond to the chapters in our living textbook, **THE_PRIMER.md**, which serves as the definitive guide for this project's construction.

---

## Development Phases

- [x] **Phase 0: The Philosophy - Understanding the 'Why'**
  - [x] Read and internalize the introduction and goals of `THE_PRIMER.md`.
  - [x] Grasp the concept of "Documentation-Driven Development" as the project's foundation.
  - [x] Review the project's overall architecture and technology choices.

- [x] **Phase 1: Project Setup (Chapter 0)**
  - [x] Establish prerequisites (Git, Docker).
  - [x] Clone repository and create local environment with `.env` file.

- [x] **Phase 2: The Docker Environment (Chapter 1)**
  - [x] Create `Dockerfile` for backend and frontend.
  - [x] Create `docker-compose.yml` to orchestrate all services.
  - [x] Implement helper scripts for deployment (`deploy.sh`).

- [x] **Phase 3: Building the Backend API (Chapter 2)**
  - [x] Set up Express server with TypeScript.
  - [x] Structure API with Routes and Controllers.
  - [x] Implement input validation with Zod.
  - [x] Implement JWT-based authentication middleware.
  - [x] Implement core CRUD operations for Pods and Games.

- [x] **Phase 4: The Database Layer (Chapter 3)**
  - [x] Define the complete `schema.prisma`.
  - [ ] Establish migration workflow. (Blocked by interactive command issue)
  - [x] Implement singleton pattern for Prisma client.

- [ ] **Phase 5: The Frontend Application (Chapter 4)**
- [ ] **Phase 6: The Testing Strategy (Chapter 5)**
- [ ] **Phase 7: The Git Workflow (Chapter 6)**
- [ ] **Phase 8: Interacting with the Running Application (Chapter 7)**
- [ ] **Phase 9: The Documentation Website (Chapter 8)**
  - [ ] Integrate Docusaurus into the project.
  - [ ] Migrate `THE_PRIMER.md` content into the Docusaurus site.
  - [ ] Set up automated deployment via GitHub Actions.