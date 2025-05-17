# PowerShell script to build the frontend application
Write-Host "Building the shop-baseline frontend application..." -ForegroundColor Green

# Navigate to the frontend directory
Set-Location -Path "$PSScriptRoot"

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install

# Build the project for production
Write-Host "Building the project for production environment..." -ForegroundColor Cyan
npm run build:prod

Write-Host "Build completed successfully!" -ForegroundColor Green
Write-Host "The built files are in the 'dist' directory." -ForegroundColor Yellow
Write-Host "You can deploy these files to a static hosting service like Netlify, Vercel, or GitHub Pages." -ForegroundColor Yellow

# Optional: Add deployment commands for your preferred hosting service
