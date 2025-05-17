#!/bin/bash
# find_dll.sh - Helper script to find the Server.dll in Railway environment

echo "===== RAILWAY DLL FINDER ====="
echo "Current directory: $(pwd)"
echo "Directory structure:"
find . -type d -maxdepth 3 | sort

echo "=== All DLL files ==="
find . -name "*.dll" | sort

echo "=== Case-insensitive search for Server.dll ==="
find . -iname "*server.dll" | sort

echo "=== Pub directory contents ==="
if [ -d "./pub" ]; then
    echo "Found ./pub directory with contents:"
    ls -la ./pub
    if [ -f "./pub/server.dll" ]; then
        echo "Found server.dll in ./pub directory!"
        # Create symlinks to handle case issues
        ln -sf ./pub/server.dll ./Server.dll
        mkdir -p ./out
        ln -sf ../pub/server.dll ./out/Server.dll
        echo "Created symlinks to server.dll"
    fi
fi

echo "=== Output directory contents ==="
if [ -d "./out" ]; then
    ls -la ./out
else
    echo "No ./out directory found!"
    echo "Creating ./out directory"
    mkdir -p ./out
fi

echo "===== END DLL FINDER ====="
