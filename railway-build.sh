#!/bin/bash
# railway-build.sh - Entry point for Railway builds

echo "Railway build script starting..."
echo "Current directory: $(pwd)"

# Navigate to the server directory
echo "Changing to server directory..."
cd lazyloadingtesting/server || { echo "Failed to change directory"; exit 1; }

echo "Current directory after change: $(pwd)"
echo "Contents of current directory:"
ls -la

# Build and publish the application
echo "Building and publishing the application..."
dotnet restore
dotnet publish -c Release -o out

echo "Publish completed. Contents of out directory:"
ls -la out/

echo "Railway build script completed successfully."
