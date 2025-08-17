#Requires -Version 5.1
param(
    [string]$BaseBranch = "main"
)

$ErrorActionPreference = "Stop"

$currentBranch = git rev-parse --abbrev-ref HEAD

if ($currentBranch -eq "main" -or $currentBranch -eq "develop") {
    Write-Error "You should not create a PR from the main or develop branch."
    exit 1
}

Write-Host "Fetching latest changes from origin..."
git fetch origin

Write-Host "Rebasing '$currentBranch' on top of 'origin/$BaseBranch'..."
git rebase "origin/$BaseBranch"

Write-Host "Pushing '$currentBranch' to origin..."
git push origin "$currentBranch" --force-with-lease

Write-Host "Branch '$currentBranch' is pushed and ready for a pull request against '$BaseBranch'."
