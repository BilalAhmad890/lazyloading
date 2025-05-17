# Railway Deployment Guide for E-Commerce API

This guide will help you deploy your .NET 8.0 E-Commerce API to Railway correctly.

## Problem Diagnosis

The error you encountered:
```
/nix/store/0f43yfx91hg74bcp66qkbp97zv3ln27i-dotnet-sdk-6.0.413/sdk/6.0.413/NuGet.targets(369,5): error MSB3202: The project file "/app/lazyloadingtesting/server/server.csproj" was not found. [/app/Project.sln]
```

This indicates two issues:
1. Railway is using .NET SDK 6.0.413 instead of .NET 8.0
2. Case sensitivity problem - looking for "server.csproj" instead of "Server.csproj"

## Solution

The solution involved:
1. Creating a root-level Dockerfile that explicitly navigates to the correct directory
2. Ensuring case-sensitivity is handled correctly
3. Setting correct environment variables
4. Updating Railway configurations to use the root Dockerfile

## Deployment Steps

### 1. Push Changes to GitHub

First, push the latest changes to GitHub:
```powershell
git push origin main
```

### 2. Deploy on Railway

#### Method 1: Using Railway Web Interface (Recommended)

1. Go to [Railway.app](https://railway.app/) and sign in
2. Click "New Project" > "Deploy from GitHub repo"
3. Select your GitHub repository
4. Railway should automatically detect the Dockerfile at the root
5. Click "Deploy"

#### Method 2: Using Railway CLI

If you have the Railway CLI installed:

1. Login to Railway: `railway login`
2. Link to your project: `railway link`
3. Deploy the app: `railway up`

### 3. Environment Variables

Make sure these environment variables are set in Railway:
- `ASPNETCORE_ENVIRONMENT`: `Production`
- `PORT`: `8080`

### 4. Verify Deployment

After deployment:
1. Check the logs in Railway dashboard for any errors
2. Test your endpoints:
   - `https://[your-railway-url]/health`
   - `https://[your-railway-url]/products`
   - `https://[your-railway-url]/products/1`

## Troubleshooting

If issues persist:

1. **SDK Version**: Check if Railway is using the correct .NET SDK version. You might need to specify it explicitly in a `railway.toml` file:
   ```toml
   [build]
   builder = "nixpacks"
   nixpacksPlan = '{ "phases": { "setup": { "nixPkgs": ["dotnet-sdk_8"] } } }'
   ```

2. **Case Sensitivity**: Linux (used by Railway) is case-sensitive. Ensure all file references match the actual case.

3. **Build Context**: Make sure the build context is correct. The root Dockerfile handles this by using explicit paths.

4. **Logs**: Check Railway deployment logs for specific errors.

5. **Manual Build**: You can simulate the Railway build locally with:
   ```powershell
   docker build -t ecommerce-api -f Dockerfile .
   docker run -p 8080:8080 ecommerce-api
   ```

## Key Files

For this deployment strategy:
- Root `Dockerfile`: Main build file that Railway will use
- `railway.yaml`: Service configuration
- `Procfile`: Simple command to run the application
- `.railwayignore`: Excludes unnecessary files from deployment
