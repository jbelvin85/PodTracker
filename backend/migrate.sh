#!/bin/sh
set -ex # Exit immediately if a command exits with a non-zero status. Print commands and their arguments as they are executed.
# The Architect: Ensuring the database is ready before migration.

# Variables
DB_HOST="db"
DB_PORT="5432"

echo "[ARCHITECT-MIGRATE] Waiting for database at $DB_HOST:$DB_PORT..."

# Loop until the database port is open
while ! nc -z "$DB_HOST" "$DB_PORT"; do
  echo "[ARCHITECT-MIGRATE] Database is unavailable - sleeping"
  sleep 1
done

echo "[ARCHITECT-MIGRATE] Database is up - executing command"

# Execute the prisma migration
npx prisma db push --accept-data-loss

echo "[ARCHITECT-MIGRATE] Migration complete."
