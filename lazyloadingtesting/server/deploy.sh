#!/bin/bash
# deploy.sh - Simplified deployment script for Railway

echo "===== RAILWAY DEPLOYMENT SCRIPT ====="

# Print environment info
echo "Current directory: $(pwd)"
echo ".NET version:"
dotnet --version

# Clean any existing output
echo "Cleaning previous builds..."
rm -rf ./out ./bin/Release ./obj/Release

# Build with explicit output path
echo "Building application..."
dotnet publish -c Release -o ./out

# Create backup copies with correct casing
echo "Creating backup copies with proper casing..."
if [ -f "./out/server.dll" ]; then
    cp ./out/server.dll ./out/Server.dll
    echo "Created case-corrected copy in ./out/"
fi

# List the output directory
echo "Output directory contents:"
ls -la ./out/

echo "===== DEPLOYMENT SCRIPT COMPLETE ====="
