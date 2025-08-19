# Gemini Context and Technical Notes

This document is for Gemini's internal use to store deeper technical context, operational notes, and project-specific information that aids in fulfilling tasks and understanding the codebase. It complements the user-facing documentation and helps maintain a consistent and efficient workflow.

## Project Overview (from PROJECT.md)

*   **Project Name:** PodTracker
*   **Core Objective:** A modern, containerized Progressive Web Application (PWA) designed for Magic: The Gathering Commander players to track games, manage decks, and analyze statistics.
*   **Key Features:** Pod Management, Deck Lists, Game Tracking (detailed), Match History, Player Statistics, Chat.
*   **Current Phase:** Phase 1: Backend & Database Foundation (In Progress)
*   **Current Task:** "Backend: Finalize and test User Authentication."

## Technology Stack Summary (from PROJECT.md)

*   **Frontend:** React, Vite, SWR, Tailwind CSS
*   **Backend:** Node.js, Express, TypeScript, Zod
*   **Database:** PostgreSQL, Prisma ORM
*   **Auth:** JSON Web Tokens (JWT)
*   **Testing:** Jest, Supertest
*   **Infrastructure:** Docker, Docker Compose, Nginx

## My Directives (from PROJECT.md)

*   **Consult & Clarify:** Always consult `PROJECT.md` and `CHANGELOG.md` first. Refer to `docs/LEARNING_JOURNAL.md` for deeper technical context and explanations (understanding that this is for the user).
*   **Execute:** Fulfill requests according to the defined `tech_stack` and `roadmap`.
*   **Propose Doc Updates:** After any major change, propose updates to `PROJECT.md` and `CHANGELOG.md`.
*   **Await Confirmation:** Do not apply changes until confirmed.
*   **Memory Management:** Proactively add new useful information from updated living documents to memory.
*   **Critical Changes:** NEVER remove a large amount of content or make significant structural changes without first explaining the intended modification and receiving explicit confirmation.

## Important Notes

*   `THE_PRIMER.md` is specifically for the user's learning and documentation. My internal technical context will be stored here in `GEMINI_CONTEXT.md`.
*   **Feature Branching:** The project utilizes a feature branching workflow. All new development (features, bug fixes) occurs on dedicated feature branches, which are then integrated into `main` (or `develop`) via PRs. The `git-push.sh` script is designed to facilitate pushing these feature branches.
