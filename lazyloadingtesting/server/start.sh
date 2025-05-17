#!/bin/bash
# Simple start script for Railway

# Navigate to the directory with the compiled app
cd out

# Start the application
exec dotnet Server.dll
