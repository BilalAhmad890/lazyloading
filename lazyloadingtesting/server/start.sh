#!/bin/bash
# Enhanced start script for Railway with debugging

# Print debugging information
echo "===== START SCRIPT DEBUG INFO ====="
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la

# Try to find Server.dll
echo "===== SEARCHING FOR SERVER.DLL ====="
find . -name "Server.dll" -type f

# Check if out directory exists
if [ -d "./out" ]; then
    echo "Found ./out directory, checking contents:"
    ls -la ./out
    if [ -f "./out/Server.dll" ]; then
        echo "Found Server.dll in ./out directory"
        exec dotnet ./out/Server.dll
    fi
else
    echo "./out directory not found"
fi

# Check if bin directory exists
if [ -d "./bin" ]; then
    echo "Found ./bin directory, searching for Server.dll:"
    find ./bin -name "Server.dll" -type f
    SERVER_DLL=$(find ./bin -name "Server.dll" -type f | head -1)
    if [ ! -z "$SERVER_DLL" ]; then
        echo "Found Server.dll at: $SERVER_DLL"
        exec dotnet "$SERVER_DLL"
    fi
fi

# As a last resort, try to find Server.dll anywhere
echo "Searching for Server.dll in entire directory structure:"
SERVER_DLL=$(find . -name "Server.dll" -type f | head -1)
if [ ! -z "$SERVER_DLL" ]; then
    echo "Found Server.dll at: $SERVER_DLL"
    exec dotnet "$SERVER_DLL"
else
    echo "ERROR: Could not find Server.dll anywhere!"
    exit 1
fi
