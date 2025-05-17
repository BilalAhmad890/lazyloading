#!/bin/bash
# deployment_script.sh - Helps with troubleshooting Railway deployments

echo "Starting deployment script..."
echo "Current directory: $(pwd)"
echo "Listing directory contents:"
ls -la

echo "Checking for project file:"
if [ -f "Server.csproj" ]; then
  echo "Found Server.csproj file!"
else
  echo "Server.csproj not found in current directory!"
  echo "Looking for any .csproj files:"
  find . -name "*.csproj"
fi

echo "Trying to build the project..."
dotnet restore
dotnet build

echo "Publishing the project..."
dotnet publish Server.csproj -c Release -o out

echo "Checking published output:"
ls -la out/

echo "Deployment script completed."
