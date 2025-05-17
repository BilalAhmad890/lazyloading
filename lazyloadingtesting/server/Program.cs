using Microsoft.Data.Sqlite;
using System.Data;
using Server.Services;
using Server.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Configure SQLite with proper path for Railway
builder.Services.AddSingleton<IDbConnection>(sp =>
{
    // Get data directory from environment variable or use current directory
    var dataDir = Environment.GetEnvironmentVariable("DATA_DIRECTORY") ?? Directory.GetCurrentDirectory();
    Directory.CreateDirectory(dataDir); // Ensure the directory exists
    var dbPath = Path.Combine(dataDir, "shopdb.sqlite");
    Console.WriteLine($"Using database at: {dbPath}");
    var connection = new SqliteConnection($"Data Source={dbPath}");
    return connection;
});

builder.Services.AddSingleton<DatabaseService>();
builder.Services.AddSingleton<ProductService>();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseStaticFiles();

// Initialize database
var dbService = app.Services.GetRequiredService<DatabaseService>();
dbService.InitializeDatabase();

// Map API endpoints
app.MapProductEndpoints();

// Configure port for Railway
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
app.Urls.Add($"http://0.0.0.0:{port}");

Console.WriteLine($"Starting server on port {port}");
app.Run();