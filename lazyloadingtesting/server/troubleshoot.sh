#!/bin/bash
# Railway deployment troubleshooting script

echo "== Railway Deployment Troubleshooting =="
echo "Current directory: $(pwd)"
echo "Listing files:"
ls -la

echo -e "\n== Checking for .NET project file =="
if [ -f "Server.csproj" ]; then
  echo "✅ Found Server.csproj (correct case)"
elif [ -f "server.csproj" ]; then
  echo "⚠️ Found server.csproj (wrong case - should be Server.csproj)"
  echo "Renaming to correct case..."
  mv server.csproj Server.csproj
else
  echo "❌ No .csproj file found, searching..."
  find . -name "*.csproj" -type f
fi

echo -e "\n== Testing .NET SDK version =="
dotnet --version

echo -e "\n== Testing build process =="
dotnet restore
dotnet build
dotnet publish -c Release -o out

echo -e "\n== Checking published output =="
ls -la out/

echo "== Troubleshooting complete =="
