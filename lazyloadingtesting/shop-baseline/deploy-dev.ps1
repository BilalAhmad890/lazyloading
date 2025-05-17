# PowerShell script to build the frontend application for development environment
Write-Host "Building the shop-baseline frontend application for development..." -ForegroundColor Green

# Navigate to the frontend directory
Set-Location -Path "$PSScriptRoot"

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install

# Build the project for development
Write-Host "Building the project for development environment..." -ForegroundColor Cyan
npm run build:dev

Write-Host "Development build completed successfully!" -ForegroundColor Green
Write-Host "The built files are in the 'dist' directory." -ForegroundColor Yellow
Write-Host "These files are configured to use the local development API at http://localhost:5000" -ForegroundColor Yellow
