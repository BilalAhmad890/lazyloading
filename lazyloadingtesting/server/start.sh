#!/bin/bash
# Enhanced start script for Railway with debugging

# Print debugging information
echo "===== START SCRIPT DEBUG INFO ====="
echo "Current directory: $(pwd)"
echo "Directory contents:"
ls -la

# Try to find Server.dll (case-insensitive)
echo "===== SEARCHING FOR SERVER.DLL (CASE-INSENSITIVE) ====="
find . -iname "*server.dll" -type f

# Priority 1: Look in pub directory (your actual build output seems to be here)
if [ -f "./pub/server.dll" ]; then
    echo "FOUND: ./pub/server.dll - using this one"
    exec dotnet ./pub/server.dll
fi

# Priority 2: Check typical output directories with case-insensitive search
PUB_DLL=$(find ./pub -iname "*server.dll" -type f | head -1)
if [ ! -z "$PUB_DLL" ]; then
    echo "FOUND: $PUB_DLL - using this one"
    exec dotnet "$PUB_DLL"
fi

# Priority 3: Check out directory
if [ -d "./out" ]; then
    echo "Found ./out directory, checking contents:"
    ls -la ./out
    OUT_DLL=$(find ./out -iname "*server.dll" -type f | head -1)
    if [ ! -z "$OUT_DLL" ]; then
        echo "FOUND: $OUT_DLL - using this one"
        exec dotnet "$OUT_DLL"
    fi
fi

# Priority 4: Check bin directory
if [ -d "./bin" ]; then
    echo "Found ./bin directory, searching for server.dll:"
    BIN_DLL=$(find ./bin -iname "*server.dll" -type f | head -1)
    if [ ! -z "$BIN_DLL" ]; then
        echo "FOUND: $BIN_DLL - using this one"
        exec dotnet "$BIN_DLL"
    fi
fi

# Priority 5: Check release directory 
RELEASE_DLL=$(find . -path "*/Release/*" -iname "*server.dll" -type f | head -1)
if [ ! -z "$RELEASE_DLL" ]; then
    echo "FOUND: $RELEASE_DLL - using this one"
    exec dotnet "$RELEASE_DLL"
fi

# Last resort: Try to find server.dll anywhere
echo "Searching for server.dll in entire directory structure:"
ANY_DLL=$(find . -iname "*server.dll" -type f | head -1)
if [ ! -z "$ANY_DLL" ]; then
    echo "FOUND: $ANY_DLL - using this one"
    exec dotnet "$ANY_DLL"
else
    echo "ERROR: Could not find server.dll anywhere!"
    echo "Directory contents:"
    find . -type f -not -path "*/node_modules/*" | sort
    exit 1
fi
