# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### 2025-08-17
- **Tooling(deploy):** Enhanced `deploy.sh` with verbose logging (`set -x`), pre-flight directory checks, and explicit error handling to improve debugging of Docker build failures.
- **Fix(deploy):** Corrected `docker-compose.yml` to specify an explicit build context for the `backend` service, resolving a `Dockerfile` location error during deployment.

## [0.1.3]
### Commit Summary
- fix(deploy)
### Commit Description
- Resolved a deployment failure by creating a placeholder frontend service. This allows the Docker environment to build and run successfully during early backend-focused development phases, unblocking further work on the API.

### Added
- **Tooling:** Created a placeholder `frontend/Dockerfile` to ensure the frontend service can be built by Docker Compose before the React application is implemented.

### Changed
- **Configuration:** Removed the obsolete `version` attribute from `docker-compose.yml` to align with modern Docker Compose standards.

### Fixed
- **Deployment:** Corrected a "path not found" error in `deploy.sh` by providing the necessary `frontend/` directory and Dockerfile for the `frontend` service build context.

## [0.1.2]
### Commit Summary
- security
### Commit Description
- Implemented JWT-based route protection middleware to secure API endpoints. Added global type definitions for the Express Request object to include authenticated user data, ensuring type-safety across the application.

### Added
- **Architecture:** Created JWT protection middleware (`src/middleware/protect.ts`) to secure routes.
- **Architecture:** Added Express type declarations (`src/types/express/index.d.ts`) to support attaching authenticated user data to requests.

## [0.1.1]
### Commit Summary
- deploy
### Commit Description
- Centralized environment configuration, improved test setup, and updated documentation.
- Implemented robust input validation for authentication endpoints using Zod.

### Added
- **Dependencies:** Added `zod` for schema validation.
- **Architecture:** Created a reusable validation middleware (`src/middleware/validate.ts`).
- **Architecture:** Created Zod schemas for authentication endpoints (`src/schemas/auth.schema.ts`).
- **Tooling:** Created `init-project.sh` script to automate initial project setup.
- **Tech Stack:** Established the core backend stack (Express, Prisma, TypeScript, Zod).
- **Testing:** Created initial test suite for authentication endpoints (`auth.test.ts`) using Jest and Supertest.
- **Backend:** Set up the main Express server, authentication controller, and routes.
- **Configuration:** Established an isolated PostgreSQL container (`test-db`) for testing.

### Changed
- **Configuration:** Centralized all environment variables into a root `.env` file. `docker-compose.yml` and `init-project.sh` now use this as a single source of truth.
- **Backend:** Refactored `auth.routes.ts` to use the new validation middleware, separating validation from controller logic.
- **Backend:** Simplified `auth.controller.ts` by removing manual validation checks.
- **Tooling:** Refactored `init-project.sh` to dynamically generate all required `.env` files from the root configuration.
- **Configuration:** Parameterized all service port mappings in `docker-compose.yml` to be configurable.
- **Configuration:** Updated `package.json` to specify the Prisma schema location.
- **Configuration:** Added `tsconfig.json` to resolve module interoperability issues for testing.
- **DB Schema:** Added `onDelete` referential actions to enforce data integrity.
- **Documentation:** Updated `README.md`, `GOALS.md`, `SUMMARY.md`, and `NETWORK.md` to reflect the current project status, architecture, and new configurations.

### Fixed
- **Testing:** Corrected the `DATABASE_URL` in `.env.test` to point to the correct host port for the test database container.

---

## [0.1.0] - 2023-10-26

This is the initial development release, establishing the project's foundation.

### Added
- **Environment:** Set up a multi-container development environment using Docker and Docker Compose.
- **Services:** Created services for `frontend` (React/Vite), `backend` (Node/Express), and `db` (PostgreSQL).
- **Configuration:** Added Dockerfiles, initial `package.json` files, and basic source code for both frontend and backend services.
- **Database:** Configured Prisma with an initial schema and connection to the PostgreSQL container.
- **Tooling:** Added a project initialization script (`init-project.sh`) to automate setup.
- **Documentation:** Established a `docs/` directory and created key documents: `SUMMARY.md`, `NETWORK.md`, and `GOALS.md`.
- **DB Schema:** Created the initial `backend/prisma/schema.prisma` file with `User`, `Deck`, and `Pod` models.

### Changed
- **Tech Stack:** Selected Express.js as the backend framework.
- **DB Schema:** Refined the `Deck` model to store Scryfall card IDs instead of full JSON objects for better efficiency.
- **Documentation:** Reorganized and polished all documentation for clarity and consistency.