# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Commit Summary

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