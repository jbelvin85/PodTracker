# PodTracker Project Summary

This document summarizes the key technical and architectural information for the PodTracker project. It is based on the information provided and will be used as a reference for future development assistance.

## 1. Project Overview

- **Name:** PodTracker
- **Description:** A cross-platform Progressive Web App (PWA) for Magic: The Gathering Commander players.
- **Core Features:**
    - Create and manage playgroups (Pods).
    - Set up and track games, including life totals, commander damage, and a timestamped log of all game actions.
    - Manage user profiles with details, settings, and external links.
    - Manage a list of user decks with commander data and external links.
    - Record and review a complete match history with a turn-by-turn event log.
    - Analyze performance statistics.
    - Pod-based group chat and direct messaging between users.

## 2. Core Architecture

PodTracker follows a standard three-tier web architecture, containerized for consistency and ease of deployment.

- **Frontend:** User Interface (Client-side)
- **Backend:** API Server (Business Logic)
- **Database:** Persistent Data Storage

## 3. Technology Stack Breakdown

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

## 4. Infrastructure & Deployment

- **Containerization:** Docker
- **Orchestration:** Docker Compose (for local development and staging)
- **Web Server / Reverse Proxy:** Nginx
- **Remote Deployment:** Git-based workflow using a custom `git-pull.sh` script on the server.
- **Future Scalability:** Potential migration to Kubernetes for larger-scale deployments.
- **Goal:** A portable, reproducible, and scalable application environment.

## 5. Development Workflow

To ensure a structured and stable development process, PodTracker utilizes a **feature branching workflow**. All new features, bug fixes, and significant changes are developed on dedicated branches, which are then integrated into the `main` branch after review. This approach promotes isolation, collaboration, and maintains the stability of the main codebase.

## 6. Documentation

- [GEMINI.md](GEMINI.md): Instructions and context for the Gemini CLI.
