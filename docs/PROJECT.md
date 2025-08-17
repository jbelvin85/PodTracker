---
# YAML Frontmatter for quick parsing of key project data.
project_name: PodTracker
current_phase: 1
current_task: "Backend: Finalize and test User Authentication."
tech_stack:
  - role: Frontend
    technology: "React, Vite, SWR, Tailwind CSS"
  - role: Backend
    technology: "Node.js, Express, TypeScript, Zod"
  - role: Database
    technology: "PostgreSQL, Prisma ORM"
  - role: Auth
    technology: "JSON Web Tokens (JWT)"
  - role: Testing
    technology: "Jest, Supertest"
  - role: Infra
    technology: "Docker, Docker Compose, Nginx"
---

# PodTracker Project Overview

This document provides a machine-readable summary of the PodTracker project's status, architecture, goals, and key documentation. It serves as a central reference for understanding the project's current state and future direction.

## 1. Core Objective & Features

PodTracker is a modern, containerized Progressive Web Application (PWA) designed for Magic: The Gathering Commander players to track games, manage decks, and analyze statistics.

**Key Features:**
- **Pod Management:** Create and manage your playgroups ("Pods").
- **Deck Lists:** Keep a list of your decks, including commander data and links to external deckbuilding sites.
- **Game Tracking:** Set up and track games, including registered and guest users (the players), turn order, life totals, commander damage, poison counters, energy counters, start time, end time and timestamped logs of all game actions (adding or removing counters, passing turns, players leaving the game, adding notes, and game resolution ie how the game was won) for more in-depth game review.
- **Match History:** Record and review your entire game history with a turn-by-turn event log.
- **Player Statistics:** Analyze your performance, deck win-rates, and more.
- **Chat:** Pod-based group chat and direct messaging between users.

## 2. Guiding Principles

- **Modern Stack:** Fully leverage the chosen tech stack (React, Express, PostgreSQL, Docker) for a better development experience and a more performant application.
- **Fresh Foundation First:** The initial goal is to build a stable and functional foundation for our entire project.
- **Expand and Improve:** Once a new foundation is reached, we will focus on expanding features, improving the user experience, and ensuring the application is scalable.

## 3. Technology Stack Breakdown

PodTracker follows a standard three-tier web architecture, containerized for consistency and ease of deployment.

### Frontend (User Interface)
- **Framework:** React
- **Build Tool:** Vite
- **State & Data Fetching:** SWR
- **Styling:** Tailwind CSS
- **Goal:** A smooth, mobile-first, installable PWA experience.

### Backend (API Server)
- **Platform:** Node.js
- **Framework:** Express
- **Data Validation:** Zod
- **Database Interaction (ORM):** Prisma
- **Authentication:** JSON Web Tokens (JWT)
- **Testing:** Jest & Supertest
- **Goal:** A type-safe, scalable API layer for core game logic and data integrity.

### Database (Persistent Storage)
- **System:** PostgreSQL
- **Schema Management:** Prisma Migrate
- **Goal:** A reliable, relational data store for structured game, player, and deck data.
- **Data Integrity:** Uses referential actions (`onDelete`) to ensure data consistency and prevent orphaned records (e.g., cascading deletes for user decks).

### Infrastructure & Deployment
- **Containerization:** Docker
- **Orchestration:** Docker Compose (for local development and staging)
- **Web Server / Reverse Proxy:** Nginx
- **Remote Deployment:** Git-based workflow using a custom `git-pull.sh` script on the server.
- **Future Scalability:** Potential migration to Kubernetes for larger-scale deployments.
- **Goal:** A portable, reproducible, and scalable application environment.

## 4. Project Roadmap

**Current Phase:** Phase 1: Backend & Database Foundation (In Progress)
**Current Task:** Finalize and test User Authentication.

| Phase | Status      | Goal                                         | Key Tasks (Refer to `docs/GOALS.md` for detailed breakdown)                                                                                                                                                                                          |
| :---- | :---------- | :------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1** | *In Progress* | **Backend & Database Foundation**            | `[x]` Schema `[x]` Auth `[ ]` Core CRUD APIs `[x]` Tooling & DX `[x]` Test Env                                                                                                                       |
| **2** | *Not Started* | **Core Frontend Implementation**             | `[ ]` UI/UX Framework `[ ]` Auth Flow `[ ]` Data Display `[ ]` Data Management                                                                                                                     |
| **3** | *Not Started* | **The Gameplay Loop**                        | `[ ]` Game Setup `[ ]` Live Game Tracking `[ ]` Game Conclusion                                                                                                                                    |
| **4** | *Not Started* | **Expansion, Analytics & Polish**            | `[ ]` Player Stats `[ ]` PWA Features `[ ]` Social Features `[ ]` UI Polish `[ ]` Deployment                                                                                                       |

## 5. Key Documentation & Resources

This project uses the `docs/` directory as the single source of truth for planning and architecture.

- **`README.md`:** Project overview, setup instructions, and high-level roadmap.
- **`docs/SUMMARY.md`:** A complete breakdown of the tech stack, architecture, and project goals.
- **`docs/GOALS.md`:** A detailed outline of the development phases and feature roadmap.
- **`CHANGELOG.md`:** A log of all notable changes to the project.
- **`docs/LEARNING_JOURNAL.md`:** This project is intended as a learning experience, and this document serves as a living textbook for practical PWA development, using the PodTracker project as a real-world example. It provides in-depth explanations of core concepts, technologies, and architectural patterns.
- **`docs/GEMINI_CONTEXT.md`:** Internal notes and technical context for the Gemini agent.
- **`docs/DECISIONS.md`:** Architectural Decision Records (ADRs) for significant design choices.
- **`docs/GLOSSARY.md`:** Definitions of key terms and acronyms used within the project.

## 6. My Directive (Gemini)

- **Consult & Clarify:** Always consult this document (`PROJECT.md`) and `CHANGELOG.md` first. Refer to `docs/LEARNING_JOURNAL.md` for deeper technical context and explanations.
- **Execute:** Fulfill requests according to the defined `tech_stack` and `roadmap`.
- **Propose Doc Updates:** After any major change, propose updates to this document and the `CHANGELOG.md`.
- **Await Confirmation:** Do not apply changes until confirmed.
- **Memory Management:** Proactively add new useful information from updated living documents to memory.
- **Branching Strategy:** Adhere to the feature branching workflow, developing new features and fixes on dedicated branches before integration into `main`.