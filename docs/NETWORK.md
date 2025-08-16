# PodTracker Network & Access Routes

This document provides a reference for the network ports and access points used by the PodTracker services in the local Docker development environment.

| Service      | Container Name        | Host Port | Container Port | Local Access URL          | Purpose                                         |
| :----------- | :-------------------- | :-------- | :------------- | :------------------------ | :---------------------------------------------- |
| **Frontend** | `podtracker-frontend` | `5173`    | `5173`         | `http://localhost:5173`   | React/Vite development server with hot-reloading. |
| **Backend**  | `podtracker-backend`  | `3001`    | `3001`         | `http://localhost:3001`   | Node.js/Express API server.                     |
| **Database** | `podtracker-db`       | `5432`    | `5432`         | `localhost:5432`          | PostgreSQL database for direct client access.   |
| **Test DB**  | `podtracker-test-db`  | `5433`    | `5432`         | `localhost:5433`          | **Isolated** PostgreSQL database for testing.   |

The `test-db` service is defined in `docker-compose.yml` and is used exclusively for running automated tests via `npm test`. It runs in a separate container with its own persisted data volume to ensure that development and testing environments are completely isolated from each other.

## Internal Container Communication

- The **backend** service connects to the **database** service using the internal Docker network address: `db:5432`.
- The **frontend** can be configured to proxy API requests to the **backend** at `http://backend:3001` to avoid CORS issues during development.