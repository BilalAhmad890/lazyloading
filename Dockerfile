# Root level Dockerfile for Railway deployment
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set working directory to the server directory
WORKDIR /app/server

# Copy the .csproj file first and restore dependencies
# Use uppercase here to match actual file name
COPY lazyloadingtesting/server/Server.csproj .
RUN dotnet restore

# Copy the rest of the application files
COPY lazyloadingtesting/server/ .

# Publish the application
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy the published output from the build stage
COPY --from=build /app/server/out/ .

# Copy wwwroot if it exists for static files
COPY --from=build /app/server/wwwroot ./wwwroot

# Expose the port the app runs on. Railway will map this.
# The PORT environment variable is automatically set by Railway.
ENV PORT=8080
ENV ASPNETCORE_URLS=http://+:${PORT}

# Add a health check (ensure you have a /health endpoint in your app)
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f "http://localhost:${PORT}/health" || exit 1

ENTRYPOINT ["dotnet", "Server.dll"]
