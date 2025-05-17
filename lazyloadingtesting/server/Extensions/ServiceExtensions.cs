using Dapper;
using Server.Models;
using Server.Models.DTOs;
using Server.Services;

namespace Server.Extensions
{
    public static class ServiceExtensions
    {
        public static void MapProductEndpoints(this WebApplication app)
        {
            // Get all products endpoint
            app.MapGet("/products", async (ProductService productService) =>
                Results.Ok(await productService.GetAllProductsAsync()));

            // Get product by ID endpoint
            app.MapGet("/products/{id}", async (int id, ProductService productService) =>
            {
                var product = await productService.GetProductByIdAsync(id);
                
                if (product == null)
                    return Results.NotFound();
                    
                return Results.Ok(product);
            });

            // Add a simple health check endpoint
            app.MapGet("/health", () => 
            {
                return Results.Ok(new { Status = "Healthy", Timestamp = DateTime.UtcNow });
            });
        }
    }
}