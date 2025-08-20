# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Documentation:** Completed initial draft of THE_PRIMER.md, covering full application build process.
- **Documentation:** Accepted ADR-0001, choosing **Docusaurus** as the Static Site Generator for project documentation.
- **Backend Foundation:**
  - Initialized Node.js/Express backend with TypeScript.
  - Implemented API routing structure with controllers and routes.
  - Integrated Zod for robust input validation.
  - Set up Prisma ORM with initial `User`, `Pod`, and `Deck` models.
  - Configured Docker Compose for PostgreSQL database service.

### Fixed
- Resolved TypeScript module resolution issues in test environment.
- Corrected Zod schema syntax for validation.

### Known Issues
- Prisma `migrate dev` command is interactive and currently hangs in the non-interactive CLI environment. Further investigation needed for non-interactive migration or schema application.

## [0.2.0] - 2025-08-18

This release marks the complete rebirth of the PodTracker project. The original codebase has been archived, and we are starting fresh with a robust, modern foundation guided by the principles laid out in `THE_PRIMER.md`.