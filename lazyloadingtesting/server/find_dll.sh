#!/bin/bash
# find_dll.sh - Helper script to find the Server.dll in Railway environment

echo "===== RAILWAY DLL FINDER ====="
echo "Current directory: $(pwd)"
echo "Directory structure:"
find . -type d -maxdepth 3 | sort

echo "=== All DLL files ==="
find . -name "*.dll" | sort

echo "=== Specific search for Server.dll ==="
find . -name "Server.dll" | sort

echo "=== Output directory contents ==="
if [ -d "./out" ]; then
    ls -la ./out
else
    echo "No ./out directory found!"
    echo "Searching for 'out' directory:"
    find . -name "out" -type d | sort
fi

echo "===== END DLL FINDER ====="
