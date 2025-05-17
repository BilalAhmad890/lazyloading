#!/bin/bash
# Build and deploy the frontend

# Ensure we're in the correct directory
cd "$(dirname "$0")"

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the project for production
echo "Building the project for production environment..."
npm run build:prod

# Output success message
echo "Build completed successfully!"
echo "The built files are in the 'dist' directory."
echo "You can deploy these files to a static hosting service like Netlify, Vercel, or GitHub Pages."

# Optional: You can add deployment commands here for your preferred hosting service
# For example, for Netlify:
# netlify deploy --prod
