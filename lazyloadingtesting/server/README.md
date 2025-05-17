# E-commerce API Server

This is a .NET 8.0 minimal API server for an e-commerce application with product data.

## Local Development

### Requirements
- .NET SDK 8.0
- SQLite

### Running Locally
```bash
cd server
dotnet restore
dotnet build
dotnet run
```

The API will be available at http://localhost:5000

## Railway.app Deployment

### Important: Root Directory Setting
When deploying to Railway, be sure to set the Root Directory to `lazyloadingtesting/server` in your Railway project settings.

### Option 1: Deploy with Dockerfile (Recommended)
1. Push your code to a Git repository
2. In Railway.app, create a new project from GitHub repo
3. When adding the service, select "Deploy from GitHub repo"
4. Under "Advanced", set the Root Directory to `lazyloadingtesting/server`
5. Railway will detect the Dockerfile automatically
6. Click "Deploy" and Railway will build and deploy your application

### Option 2: Deploy with Nixpacks
1. Push your code to a Git repository
2. In Railway.app, create a new project from GitHub repo
3. When adding the service, select "Deploy from GitHub repo"
4. Under "Advanced", set the Root Directory to `lazyloadingtesting/server`
5. Railway will use Nixpacks to build and deploy the application
6. Ensure the railway.json file is in the server directory

### Environment Variables
Make sure to set these variables in Railway:
- `PORT`: `8080`
- `ASPNETCORE_URLS`: `http://+:8080`

### Troubleshooting MSBUILD Errors
If you encounter MSBUILD errors (such as MSB1003):

1. Verify that the Root Directory is correctly set to `lazyloadingtesting/server`
2. Check the case sensitivity of files:
   - Your project file is named `Server.csproj` with a capital 'S'
   - Your application DLL is named `Server.dll` with a capital 'S'
3. Make sure railway.json has the correct case for files: `Server.csproj`, not `server.csproj`
4. Check the build logs for specific errors
5. Try redeploying by clicking "Redeploy" in the Railway dashboard

## API Endpoints

- `GET /products` - Get all products
- `GET /products/{id}` - Get product by ID
- `GET /health` - Health check endpoint
