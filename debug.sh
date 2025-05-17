#!/bin/bash
# debug.sh - Debug script for Railway deployment

echo "============ DEBUGGING INFO ============"
echo "Current directory: $(pwd)"
echo "----------------------------------------"
echo "Directory structure:"
find . -type f -name "*.csproj" | sort
echo "----------------------------------------"
echo "Server directory contents:"
ls -la lazyloadingtesting/server/
echo "----------------------------------------"
echo "Server.csproj exists?: $(test -f lazyloadingtesting/server/Server.csproj && echo 'Yes' || echo 'No')"
echo "server.csproj exists?: $(test -f lazyloadingtesting/server/server.csproj && echo 'Yes' || echo 'No')"
echo "----------------------------------------"
echo "Checking case sensitivity:"
find . -type f -name "[Ss]erver.csproj" | sort
echo "============ END DEBUGGING ============"
