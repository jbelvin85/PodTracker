# PowerShell script for initial PodTracker Project Setup (Windows)

Write-Host "--- Initializing PodTracker Project (One-Time Setup) ---"

# Exit immediately if a command exits with a non-zero status.
$ErrorActionPreference = "Stop"

# Navigate to the project root directory, so this script can be run from anywhere
Set-Location (Join-Path (Split-Path $MyInvocation.MyCommand.Path) "..")

# --- 1. Check for prerequisites ---
Write-Host "1. Checking for prerequisites..."
try {
    docker --version | Out-Null
} catch {
    Write-Host "Error: Docker is not installed. Please install Docker Desktop." -ForegroundColor Red
    exit 1
}

try {
    docker compose version | Out-Null
} catch {
    Write-Host "Error: docker compose is not available. Please install the Docker Compose plugin." -ForegroundColor Red
    exit 1
}

# --- 2. Set Script Permissions ---
# Not directly applicable for PowerShell scripts in the same way as bash,
# but ensuring .sh scripts are executable for WSL/Git Bash users.
Write-Host "2. Setting executable permissions for shell scripts..."
Get-ChildItem -Path "scripts/*.sh" | ForEach-Object {
    # This command is for WSL/Git Bash users, won't affect native Windows execution
    # You might need to run this in a bash shell if chmod is not available in PowerShell
    # For now, we'll just echo a message.
    Write-Host "   - Ensure executable permissions for $($_.Name) if using WSL/Git Bash."
}

# --- 3. Define Environment Variables ---
# These will be written to the root .env file and used by docker-compose
# and to generate other .env files.

# Default values for non-sensitive variables
$env:POSTGRES_DB = $env:POSTGRES_DB -split ' ' | Select-Object -First 1
if (-not $env:POSTGRES_DB) { $env:POSTGRES_DB = "podtracker" }

$env:DB_PORT = $env:DB_PORT -split ' ' | Select-Object -First 1
if (-not $env:DB_PORT) { $env:DB_PORT = "5432" }

$env:TEST_DB_PORT = $env:TEST_DB_PORT -split ' ' | Select-Object -First 1
if (-not $env:TEST_DB_PORT) { $env:TEST_DB_PORT = "5433" }

$env:BACKEND_PORT = $env:BACKEND_PORT -split ' ' | Select-Object -First 1
if (-not $env:BACKEND_PORT) { $env:BACKEND_PORT = "3001" }

$env:FRONTEND_PORT = $env:FRONTEND_PORT -split ' ' | Select-Object -First 1
if (-not $env:FRONTEND_PORT) { $env:FRONTEND_PORT = "5173" }

# Prompt for PostgreSQL User
if (-not $env:POSTGRES_USER) {
    $input_user = Read-Host -Prompt "Enter PostgreSQL username (default: postgres)"
    if ([string]::IsNullOrWhiteSpace($input_user)) {
        $env:POSTGRES_USER = "postgres"
    } else {
        $env:POSTGRES_USER = $input_user
    }
}

# Prompt for PostgreSQL Password
if (-not $env:POSTGRES_PASSWORD) {
    $input_password = Read-Host -Prompt "Enter PostgreSQL password (default: postgres)" -AsSecureString
    if ($input_password.Length -eq 0) {
        $env:POSTGRES_PASSWORD = "postgres"
    } else {
        $env:POSTGRES_PASSWORD = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($input_password))
    }
}

# Generate or prompt for JWT_SECRET
if (-not $env:JWT_SECRET) {
    $generate_jwt = Read-Host -Prompt "Generate a random JWT_SECRET? (y/N)"
    if ($generate_jwt -eq "y" -or $generate_jwt -eq "Y") {
        $bytes = New-Object Byte[] 32
        (New-Object System.Security.Cryptography.RNGCryptoServiceProvider).GetBytes($bytes)
        $env:JWT_SECRET = [System.Convert]::ToBase64String($bytes)
        Write-Host "Generated JWT_SECRET: $($env:JWT_SECRET)"
    } else {
        $env:JWT_SECRET = Read-Host -Prompt "Enter JWT_SECRET"
    }
}

# Generate or prompt for TEST_JWT_SECRET
if (-not $env:TEST_JWT_SECRET) {
    $generate_test_jwt = Read-Host -Prompt "Generate a random TEST_JWT_SECRET? (y/N)"
    if ($generate_test_jwt -eq "y" -or $generate_test_jwt -eq "Y") {
        $bytes = New-Object Byte[] 32
        (New-Object System.Security.Cryptography.RNGCryptoServiceProvider).GetBytes($bytes)
        $env:TEST_JWT_SECRET = [System.Convert]::ToBase64String($bytes)
        Write-Host "Generated TEST_JWT_SECRET: $($env:TEST_JWT_SECRET)"
    } else {
        $env:TEST_JWT_SECRET = Read-Host -Prompt "Enter TEST_JWT_SECRET"
    }
}

# --- 4. Create root .env file for Docker Compose ---
Write-Host "3. Setting up root .env file for Docker Compose..."
if (-not (Test-Path "./.env")) {
    @"
# --- Docker Compose Environment Variables ---

# PostgreSQL - Main Database
POSTGRES_USER=$($env:POSTGRES_USER)
POSTGRES_PASSWORD=$($env:POSTGRES_PASSWORD)
POSTGRES_DB=$($env:POSTGRES_DB)

# Port Mappings
DB_PORT=$($env:DB_PORT)
TEST_DB_PORT=$($env:TEST_DB_PORT)
BACKEND_PORT=$($env:BACKEND_PORT)
FRONTEND_PORT=$($env:FRONTEND_PORT)
"@ | Set-Content -Path "./.env"
    Write-Host "   - Created ./.env file."
} else {
    Write-Host "   - ./.env already exists. Skipping."
}

# --- 5. Create application-specific .env files ---
Write-Host "4. Setting up application-specific environment files..."
if (-not (Test-Path "./backend/.env")) {
    @"
# PostgreSQL Database Connection (for backend service)
DATABASE_URL="postgresql://$($env:POSTGRES_USER):$($env:POSTGRES_PASSWORD)@db:$($env:DB_PORT)/$($env:POSTGRES_DB)"

# JWT Secret for signing authentication tokens
JWT_SECRET="$($env:JWT_SECRET)"
"@ | Set-Content -Path "./backend/.env"
    Write-Host "   - Created ./backend/.env"
} else {
    Write-Host "   - ./backend/.env already exists. Skipping."
}

if (-not (Test-Path "./.env.test")) {
    @"
# PostgreSQL Database Connection (for local testing)
DATABASE_URL="postgresql://$($env:POSTGRES_USER):$($env:POSTGRES_PASSWORD)@localhost:$($env:TEST_DB_PORT)/podtracker_test"

# JWT Secret for signing authentication tokens in tests
JWT_SECRET="$($env:TEST_JWT_SECRET)"
"@ | Set-Content -Path "./.env.test"
    Write-Host "   - Created ./.env.test"
} else {
    Write-Host "   - ./.env.test already exists. Skipping."
}

# --- 6. Install Node.js Dependencies ---
Write-Host "5. Installing Node.js dependencies..."
npm install

# --- 7. Generate Prisma Client and Apply Migrations ---
Write-Host "6. Generating Prisma Client and Applying Migrations..."
# For development, `prisma db push` is faster and creates the schema directly.
# For production, `prisma migrate deploy` is used to apply pending migrations.
# We'll use db push for initial setup and development convenience.
npx prisma db push --accept-data-loss

# Generate Prisma Client
npx prisma generate

Write-Host ""
Write-Host "--- ✅ Project Setup Complete! ---"
Write-Host "Next step: Run '.\scripts\deploy.ps1' to build and start the application."

# Call deploy.ps1
Write-Host "Next step: Starting application deployment..."
.\scripts\deploy.ps1