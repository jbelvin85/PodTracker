# Commit Summary
docs: Formalize Git workflow with feature branching

## Commit Description
This commit formalizes the project's Git workflow by introducing and documenting the use of feature branches.

Key changes include:
- Updated `docs/DIRECTIVE.md` with a new section on "Branching Strategy" detailing the feature branching workflow, including isolation, integration, and the use of `git-push.sh`.
- Updated `docs/PROJECT.md` to reflect adherence to the feature branching workflow in the Gemini's directive.
- Updated `docs/GEMINI_CONTEXT.md` to include feature branching as a key project workflow for Gemini's internal context.
- Updated `README.md` with a new "Contribution Guidelines" section, briefly introducing feature branching and linking to `docs/DIRECTIVE.md`. Also added `docs/LEARNING_JOURNAL.md` to the project documentation list.
- Updated `docs/SUMMARY.md` with a new "Development Workflow" section, providing a high-level overview of the feature branching strategy.
- Added a new "Chapter 7: The Branching Paths - Our Git Workflow" to `docs/LEARNING_JOURNAL.md`, providing an in-depth explanation of feature branches, rebase vs. merge, the role of `git-push.sh`, and Pull Requests, using Magic: The Gathering analogies.

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.6] - 2025-08-17
### Added
- **Documentation:** Created `docs/GEMINI_CONTEXT.md` for internal agent notes and technical context.
- **Documentation:** Created `docs/DECISIONS.md` for Architectural Decision Records.
- **Documentation:** Created `docs/GLOSSARY.md` for project-specific terminology.

### Changed
- **Documentation:** Updated `docs/GLOSSARY.md` with definitions for 'MTG' and 'Turn'.

---

## [0.1.5] - 2024-08-19
### Added
- **Documentation:** Created `docs/PROJECT.md` to serve as a machine-readable summary of the project.
- **Tooling(git):** Created `scripts/git-pull.sh` to interactively pull updates from the git repository on the server.
- **Tooling:** Created `get_timestamp.sh` and `get_timestamp.ps1` helper scripts to generate a standardized timestamp string (`YYYY-MM-DD-HH-MM-SS`).

### Changed
- **Documentation:** Updated `docs/DIRECTIVE.md` to incorporate `PROJECT.md` into the core workflow, add a rule for maintaining `CHANGELOG.md`, and refactored the entire document for clarity.
- **Configuration:** Centralized all backend environment variables (`DATABASE_URL`, `JWT_SECRET`, etc.) to be sourced from the root `.env` file and passed into the `backend` container via `docker-compose.yml`. Removed the redundant `backend/.env` file reference.
- **Architecture:** Refactored the backend to use a singleton pattern for the Prisma client, improving database connection management and efficiency.
- **Tooling(setup):** The `setup.sh` script now automatically makes all `.sh` scripts in the `scripts/` directory executable.

### Fixed
- **Deployment:** The `deploy.sh` script now correctly runs database migrations and tests inside the `backend` container using `docker compose exec`, ensuring a consistent and reliable environment.

### Removed
- **Tooling(deploy):** Removed `scripts/deploy-to-server.sh`.
- **Tooling(deploy):** Removed `scripts/remote-setup.sh`.

---

## [0.1.4] - 2024-08-18
### Commit Summary
- fix(deploy)
### Commit Description
- Enhanced the `git-pr.sh` script with a more robust and user-friendly interface. This improves the developer workflow by preventing common errors and clarifying the script's actions.

### Changed
- **Tooling(git):** Updated `git-pr.sh` to include color-coded output, pre-flight checks for uncommitted changes, a confirmation prompt before execution, and better error handling for rebase conflicts.

---

## [0.1.3] - 2024-08-18
### Commit Summary
- fix(deploy)
### Commit Description
- Resolved deployment failures and improved developer tooling. This release introduces helper scripts for pull requests, enhances the deployment script, and adds placeholders to ensure the Docker environment builds successfully during early backend-focused development.

### Added
- **Tooling:** Created a placeholder `frontend/Dockerfile` to ensure the frontend service can be built by Docker Compose before the React application is implemented.
- **Tooling(git):** Created `scripts/git-pr.sh` and `scripts/git-pr.ps1` to streamline the process of preparing branches for pull requests on Debian and Windows systems.

### Changed
- **Configuration:** Removed the obsolete `version` attribute from `docker-compose.yml` to align with modern Docker Compose standards.
- **Tooling(deploy):** Enhanced `deploy.sh` with verbose logging (`set -x`), pre-flight directory checks, and explicit error handling to improve debugging of Docker build failures.

### Fixed
- **Deployment:** Corrected a "path not found" error in `deploy.sh` by providing the necessary `frontend/` directory and Dockerfile for the `frontend` service build context.
- **Deployment:** Corrected `docker-compose.yml` to specify an explicit build context for the `backend` service, resolving a `Dockerfile` location error during deployment.

---

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

---

## [0.1.5] - 2024-08-19
### Added
- **Documentation:** Created `docs/PROJECT.md` to serve as a machine-readable summary of the project.
- **Tooling(git):** Created `scripts/git-pull.sh` to interactively pull updates from the git repository on the server.
- **Tooling:** Created `get_timestamp.sh` and `get_timestamp.ps1` helper scripts to generate a standardized timestamp string (`YYYY-MM-DD-HH-MM-SS`).

### Changed
- **Documentation:** Updated `docs/DIRECTIVE.md` to incorporate `PROJECT.md` into the core workflow, add a rule for maintaining `CHANGELOG.md`, and refactored the entire document for clarity.
- **Configuration:** Centralized all backend environment variables (`DATABASE_URL`, `JWT_SECRET`, etc.) to be sourced from the root `.env` file and passed into the `backend` container via `docker-compose.yml`. Removed the redundant `backend/.env` file reference.
- **Architecture:** Refactored the backend to use a singleton pattern for the Prisma client, improving database connection management and efficiency.
- **Tooling(setup):** The `setup.sh` script now automatically makes all `.sh` scripts in the `scripts/` directory executable.

### Fixed
- **Deployment:** The `deploy.sh` script now correctly runs database migrations and tests inside the `backend` container using `docker compose exec`, ensuring a consistent and reliable environment.

### Removed
- **Tooling(deploy):** Removed `scripts/deploy-to-server.sh`.
- **Tooling(deploy):** Removed `scripts/remote-setup.sh`.

---

## [0.1.4] - 2024-08-18
### Commit Summary
- fix(deploy)
### Commit Description
- Enhanced the `git-pr.sh` script with a more robust and user-friendly interface. This improves the developer workflow by preventing common errors and clarifying the script's actions.

### Changed
- **Tooling(git):** Updated `git-pr.sh` to include color-coded output, pre-flight checks for uncommitted changes, a confirmation prompt before execution, and better error handling for rebase conflicts.

---

## [0.1.3] - 2024-08-18
### Commit Summary
- fix(deploy)
### Commit Description
- Resolved deployment failures and improved developer tooling. This release introduces helper scripts for pull requests, enhances the deployment script, and adds placeholders to ensure the Docker environment builds successfully during early backend-focused development.

### Added
- **Tooling:** Created a placeholder `frontend/Dockerfile` to ensure the frontend service can be built by Docker Compose before the React application is implemented.
- **Tooling(git):** Created `scripts/git-pr.sh` and `scripts/git-pr.ps1` to streamline the process of preparing branches for pull requests on Debian and Windows systems.

### Changed
- **Configuration:** Removed the obsolete `version` attribute from `docker-compose.yml` to align with modern Docker Compose standards.
- **Tooling(deploy):** Enhanced `deploy.sh` with verbose logging (`set -x`), pre-flight directory checks, and explicit error handling to improve debugging of Docker build failures.

### Fixed
- **Deployment:** Corrected a "path not found" error in `deploy.sh` by providing the necessary `frontend/` directory and Dockerfile for the `frontend` service build context.
- **Deployment:** Corrected `docker-compose.yml` to specify an explicit build context for the `backend` service, resolving a `Dockerfile` location error during deployment.

---

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