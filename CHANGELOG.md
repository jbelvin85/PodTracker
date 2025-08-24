# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Documentation:** Wrote Chapter 2, "Setting Up Your Development Environment," for `THE_PRIMER.md`.
- **Documentation:** Wrote Chapter 1, "Introduction to PodTracker," for `THE_PRIMER.md`.
- **Feature:** Implemented Minimum Viable Product (MVP) for PodTracker.
  - User authentication (registration, login, JWT-based).
  - Pod management (CRUD operations).
  - Game management (CRUD operations).
- **Frontend:** Implemented user authentication (login, registration) with JWT.
- **Frontend:** Integrated `AuthContext` and `useAuth` hook for authentication state management.
- **Frontend:** Implemented protected routes using `react-router-dom`.
- **Frontend:** Displayed authenticated user data on the homepage.
- **Frontend:** Implemented Pod Management (list, create, update, delete) with SWR.
- **Frontend:** Implemented Deck Management (list, create, update, delete) with SWR.
- **Frontend:** Implemented Game Tracking (list, create, update, delete) with SWR.
- **Deployment:** Configured Docker Compose for local full-stack application deployment (backend, frontend, database, Nginx).
- **Scripts:** Added `setup.bat` for initial project setup and `deploy.bat` for Docker Compose management.
- **Deployment:** Configured Docker Compose for local full-stack application deployment (backend, frontend, database, Nginx).
- **Frontend:** Implemented user authentication (login, registration) with JWT.
- **Frontend:** Integrated `AuthContext` and `useAuth` hook for authentication state management.
- **Frontend:** Implemented protected routes using `react-router-dom`.
- **Frontend:** Displayed authenticated user data on the homepage.
- **Backend:** Implemented CRUD API endpoints for the `Game` model.
- **Testing:** Added integration tests for the Game model (CRUD operations).
- **Backend:** Implemented centralized error handling with custom error classes (`ApiError`, `NotFoundError`, `BadRequestError`, `UnauthorizedError`, `ForbiddenError`).
- **Backend:** Refactored controllers to use new error handling middleware.
- **Testing:** Added integration tests for various error scenarios (validation, not found, unauthorized).
- **Testing:**
  - Implemented basic backend database integration tests using Jest and Prisma.
  - Added `start_and_monitor_tests.sh` script for automated test execution, including Docker Compose setup and teardown.
  - Documented `test:e2e` npm script in `THE_PRIMER.md`.
  - Added integration tests for the Pod model (CRUD operations).
  - Added integration tests for the Deck model (CRUD operations).
- **Documentation:** Completed initial draft of THE_PRIMER.md, covering full application build process.
- **Documentation:** Accepted ADR-0001, choosing **Docusaurus** as the Static Site Generator for project documentation.
- **Backend Foundation:**
  - Initialized Node.js/Express backend with TypeScript.
  - Implemented API routing structure with controllers and routes.
  - Integrated Zod for robust input validation.
  - Set up Prisma ORM with initial `User`, `Pod`, and `Game` models.
  - Configured Docker Compose for PostgreSQL database service.

### Changed
- Renamed 'Decks' to 'Games' across the frontend to align with backend entity.

### Fixed
- **Deployment:** Resolved a port conflict with WSL by changing the application's exposed port from `8080` to `8000`.
- **Frontend:** Corrected an `EISDIR` error by replacing the `frontend/index.html` directory with a file.
- **Frontend:** Fixed a Vite configuration issue that prevented the frontend from being accessible within the Docker container.
- Resolved TypeScript module resolution issues in test environment.
- Corrected Zod schema syntax for validation.

### Known Issues
- Prisma `migrate dev` command is interactive and currently hangs in the non-interactive CLI environment. Further investigation needed for non-interactive migration or schema application.

## [0.2.0] - 2025-08-18

This release marks the complete rebirth of the PodTracker project. The original codebase has been archived, and we are starting fresh with a robust, modern foundation guided by the principles laid out in `THE_PRIMER.md`.