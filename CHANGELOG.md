# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Tech Stack:** Established the core backend stack, including Express for the server, Prisma for the ORM, TypeScript for the language, and Zod for data validation.
- **Dependencies:** Added the `dotenv` package to manage environment variables for testing.
- **Configuration:** Created the `.env.test` file to provide a separate database and JWT secret for the testing environment.
- **Configuration:** Created the `.env` file for the development environment with default database and JWT secret values.
- **Database:** Generated the Prisma Client (`npx prisma generate`) to enable database access in the application code. This was necessary to run the test suite.
- **Configuration:** Created `tsconfig.json` to configure the TypeScript compiler. This was necessary to resolve a module interoperability issue (`esModuleInterop`) that prevented the test suite from running. This file governs how our TypeScript code is compiled into JavaScript.
- **Testing:** Created initial test suite for authentication endpoints (`auth.test.ts`).
- **Backend:** Set up the main Express server file (`src/index.ts`) and connected the authentication routes.
- **Authentication:** Created controller with logic for user registration and login (`auth.controller.ts`).
- **Authentication:** Created initial routes for user registration and login (`auth.routes.ts`).
- **Tech Stack:** Selected Jest and Supertest as the testing framework for the backend API.
- **Testing:** Configured an isolated PostgreSQL container (`test-db`) and environment (`.env.test`) for backend testing.

### Changed
- **Testing:** Identified pending Docker installation as the root cause of database connection errors during test execution.
- **Testing:** Configured Jest to load environment variables from `.env.test` using a setup file (`src/tests/setup.ts`). This was done by adding the `setupFiles` property to the `jest` configuration in `package.json`.
- **Configuration:** Updated `package.json` to specify the location of the Prisma schema file. This simplifies running Prisma commands.
- **Project Focus:** Clarified project direction, confirming the application is for Magic: The Gathering, not podcasts. The `Pod` in "PodTracker" refers to a playgroup.
- **DB Schema:** Added `onDelete` referential actions (`Cascade` for Decks, `Restrict` for Pod Admins) to enforce data integrity rules at the database level.
- **Documentation:** Expanded the "Features" list in `README.md` to provide greater detail on the gameplay loop and match history capabilities.
- **Documentation:** Updated `GOALS.md` and `SUMMARY.md` to align with the newly detailed feature set.
- **Documentation:** Synchronized the roadmap in `README.md` with the current project status in `GOALS.md`.

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