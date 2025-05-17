# Fix for `cd` Not Found Error on Railway

This is an update to fix the "The executable `cd` could not be found" error in Railway deployment.

## Problem

Railway's container environment doesn't always recognize the `cd` command in deployment start scripts, causing deployment failure.

## Solution

We've made the following changes:

1. Updated all start commands to avoid using `cd`:
   - Changed from: `cd out && dotnet Server.dll` 
   - Changed to: `dotnet ./out/Server.dll`

2. Created a dedicated `start.sh` bash script that:
   - Uses proper navigation commands compatible with Railway's shell
   - Is marked executable with `chmod +x`
   - Uses `exec` to properly handle process signals

## How to Deploy

1. Push these latest changes to GitHub
2. In Railway, deploy your application with these settings:
   - Root Directory: `lazyloadingtesting/server`
   - Environment Variables:
     - `PORT`: `8080` 
     - `ASPNETCORE_URLS`: `http://+:8080`
     - `NIXPACKS_PKGS`: `dotnet-sdk_8`

## If You Still Have Issues

Try one of these alternatives:

1. In Railway, go to Settings → Deployment and change the Start Command to:
   ```
   dotnet ./out/Server.dll
   ```

2. Or try this alternative start command:
   ```
   chmod +x start.sh && ./start.sh
   ```

3. Delete and redeploy the service with the "Root Directory" setting correctly specified as `lazyloadingtesting/server`
