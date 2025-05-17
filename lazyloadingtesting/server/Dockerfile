FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the .csproj file first and restore dependencies
# This allows Docker to cache the restored dependencies layer
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the application files
COPY . ./

# Publish the application
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy the published output from the build stage
COPY --from=build /app/out/ .

# Expose the port the app runs on. Railway will map this.
# The PORT environment variable is automatically set by Railway.
ENV PORT=8080
ENV ASPNETCORE_URLS=http://+:${PORT}

# Add a health check (ensure you have a /health endpoint in your app)
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f "http://localhost:8080/health" || exit 1

ENTRYPOINT ["dotnet", "Server.dll"]