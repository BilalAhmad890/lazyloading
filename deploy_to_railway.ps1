# This script will prepare your project for Railway deployment

# Step 1: Build the project
Write-Host "Building the Server project..." -ForegroundColor Green
dotnet build "c:\Users\bilal\Desktop\FUEC\examen arbete\Project\lazyloadingtesting\server\Server.csproj" -c Release

# Step 2: Publish the project
Write-Host "Publishing the Server project..." -ForegroundColor Green
dotnet publish "c:\Users\bilal\Desktop\FUEC\examen arbete\Project\lazyloadingtesting\server\Server.csproj" -c Release -o "c:\Users\bilal\Desktop\FUEC\examen arbete\Project\lazyloadingtesting\server\out"

Write-Host "Deployment preparation completed!" -ForegroundColor Green
Write-Host "You can now deploy to Railway.app using either:" -ForegroundColor Yellow
Write-Host "  - The web interface at https://railway.app" -ForegroundColor Yellow
Write-Host "  - The Railway CLI with 'railway up'" -ForegroundColor Yellow
Write-Host ""
Write-Host "Remember to set the Root Directory to 'lazyloadingtesting/server' in Railway settings" -ForegroundColor Cyan
