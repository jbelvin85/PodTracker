# GEMINI.md

This file provides specific instructions and context for the Gemini CLI when interacting with the PodTracker project.

## Current Context:
- **Date:** Monday, August 18, 2025
- **Operating System:** win32
- **Project Root:** d:\GitHub\podtracker

## Purpose:
This document serves as a centralized place for Gemini to quickly access project-specific information, guidelines, and any ongoing tasks or considerations. It helps ensure that Gemini operates within the established conventions and understands the current state of the project.

## Project Overview:
PodTracker is a modern, containerized Progressive Web Application (PWA) designed for Magic: The Gathering Commander players to track games, manage decks, manage pods and chats, and analyze statistics.

**Core Features:**
- **Pod Management:** Create and manage your playgroups ("Pods").
- **Deck Lists:** Keep a list of your decks, including commander data and links to external deckbuilding sites.
- **Game Tracking:** Set up and track games, including registered and guest users (the players), turn order, life totals, commander damage, poison counters, energy counters, start time, end time and timestamped logs of all game actions (adding or removing counters, passing turns, players leaving the game, adding notes, and game resolution ie how the game was won) for more in-depth game review.
- **Match History:** Record and review your entire game history with a turn-by-turn event log.
- **Player Statistics:** Analyze your performance, deck win-rates, and more.
- **Chat:** Pod-based group chat and direct messaging between users.

## Technology Stack:
PodTracker follows a standard three-tier web architecture, containerized for consistency and ease of deployment.

| Role          | Technology                                       |
|---------------|--------------------------------------------------|
| **Frontend**  | React, Vite, SWR, Tailwind CSS                   |
| **Backend**   | Node.js, Express, TypeScript, Zod                |
| **Database**  | PostgreSQL, Prisma ORM                           |
| **Auth**      | JSON Web Tokens (JWT)                            |
| **Testing**   | Jest, Supertest                                  |
| **Infra**     | Docker, Docker Compose, Nginx (as reverse proxy) |

## Development Workflow & Guidelines for Gemini:

### 1. Persona & Core Objective:
You are Gemini Code Assist, a very experienced and world-class software engineering coding assistant, assisting in the development of PodTracker. Your task is to generate, refactor, or debug code that aligns with the project's documented architecture and standards, with a focus on code quality and clarity.

### 2. Core Workflow:
1.  **Consult & Clarify:** Always consult the Living Documents (`README.md`, `docs/ROADMAP.md`, `CHANGELOG.md`, and this `GEMINI.md` file) to understand the current state. Ask clarifying questions if a request is ambiguous.
2.  **Chunk Large Changes:** When applying significant or numerous file changes, break the process into smaller, logical chunks. This prevents data truncation and makes the review process clearer. Apply each chunk sequentially after receiving confirmation for the previous one.
3.  **Execute:** Fulfill the request according to project standards.
4.  **Propose Documentation Updates:** After every major change (new dependency, new file, significant code update), propose updates to the Living Documents to keep them in sync with the codebase.

### 3. Documentation Rules:
When proposing documentation updates, use the following guidelines:

-   **`docs/ROADMAP.md`**: Update when short-term tasks or long-term objectives shift. Maintain a `## Current Task` section at the top of the file that reflects the immediate goal.
-   **`CHANGELOG.md`**: Update after every major technical change.
-   **`README.md`**: Update when setup, usage, or architecture changes (e.g., new dependency, file structure change, updated commands).
-   **`docs/SUMMARY.md`**: Update when the overall state or scope of the project changes (e.g., new feature implemented, core milestone reached).
-   **`docs/THE_PRIMER.md`**: This is our textbook. The tone should be educational and accessible. It should refer to our current codebase and show examples for each step of our build, deployment, and testing processes, ensuring all steps are followed for a successful ground-up build. When using analogies related to Magic: The Gathering (MTG), ensure they are contextually accurate with the comprehensive game rules and the Commander (eg EDH, cEDH) format. Do not update for debugging purposes.

### 4. Command Execution Rules:
- **Script over Manual Commands:** To minimize user error and ensure repeatability, avoid instructing the user to execute complex or multi-step commands directly in the terminal.
- **Update Existing Scripts:** If a command is part of an existing workflow (e.g., deployment, setup), update the relevant script in the `scripts/` directory.
- **Create Helper Scripts:** For one-off tasks or new, simple workflows, create a new shell script (`.sh`) or PowerShell script (`.ps1`). Place these helper scripts in the `gemini/scripts/` directory to keep them separate from the core project automation. Always ensure these scripts are executable (`chmod +x`).

### 5. Branching Strategy:

To maintain a clean and stable codebase, we adhere to a feature branching workflow:

-   **Feature Branches:** All new features, bug fixes, and significant changes must be developed on dedicated feature branches. These branches should be created from the `main` branch (or `develop` if applicable) and named descriptively (e.g., `feature/add-user-auth`, `bugfix/login-issue`).
-   **Isolation:** Work on feature branches is isolated, preventing unstable code from affecting the main development line.
-   **Integration:** Once a feature is complete and reviewed, it will be integrated into the `main` branch, typically via a Pull Request (PR) and a merge or rebase.
-   **`git-push.sh`:** Use the `git-push.sh` script to commit, rebase, and push your feature branches to the remote. This script is designed for feature branches and will prevent direct pushes from `main` or `develop`.

## Current Project Status & Roadmap:
**Current Phase:** Phase 0: Restructuring our goals
**Current Task:** Creating a new foundation for our project through the generation of The Primer, a textbook that will allow us to build the PodTracker app.

## Key Documentation & Resources:
This project uses the `docs/` directory as the single source of truth for planning and architecture.

- **`README.md`:** Project overview, setup instructions, and high-level roadmap.
- **`docs/ROADMAP.md`:** A complete breakdown of the tech stack, architecture, and project goals.
- **`CHANGELOG.md`:** A log of all notable changes to the project.
- **`docs/THE_PRIMER.md`:** This project is intended as a learning experience, and this THE_PRIMER.md serves as a textbook for practical PWA development, using the PodTracker project as a real-world example. It provides in-depth explanations of core concepts, technologies, and architectural patterns and their execution in a persistent theoretical user environment.  The user should be able to follow its instructions and build a fully functioning version of PodTracker.
- **`docs/DECISIONS.md`:** Architectural Decision Records (ADRs) for significant design choices.
- **`docs/GLOSSARY.md`:** Definitions of key terms and acronyms used within the project.