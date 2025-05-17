using Dapper;
using Server.Models;
using System.Data;

namespace Server.Services
{
    public class DatabaseService
    {
        private readonly IDbConnection _connection;

        public DatabaseService(IDbConnection connection)
        {
            _connection = connection;
        }

        public void InitializeDatabase()
        {
            try
            {
                Console.WriteLine("Opening database connection...");
                _connection.Open();
                
                Console.WriteLine("Creating tables if they don't exist...");
                // Create tables if they don't exist
                _connection.Execute(@"
                    CREATE TABLE IF NOT EXISTS Products (
                        Id INTEGER PRIMARY KEY,
                        Title TEXT NOT NULL,
                        Description TEXT NOT NULL,
                        Price REAL NOT NULL,
                        Category TEXT NOT NULL
                    )");
                
                _connection.Execute(@"
                    CREATE TABLE IF NOT EXISTS ProductImages (
                        Id INTEGER PRIMARY KEY,
                        ProductId INTEGER NOT NULL,
                        FileName TEXT NOT NULL,
                        FOREIGN KEY (ProductId) REFERENCES Products(Id)
                    )");
                
                // Check if we have any data
                Console.WriteLine("Checking if database needs to be seeded...");
                var productCount = _connection.ExecuteScalar<int>("SELECT COUNT(*) FROM Products");
                
                if (productCount == 0)
                {
                    Console.WriteLine("Seeding database with sample data...");
                    SeedDatabaseWithSampleData();
                }
                else
                {
                    Console.WriteLine($"Database already contains {productCount} products.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error initializing database: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                throw;
            }
        }

        private void SeedDatabaseWithSampleData()
        {
            // Insert sample data
            var products = new[]
            {
                new { Title = "Wireless Headphones", Description = "Over-ear Bluetooth headset with noise cancellation and mic", Price = 199.00, Category = "Electronics" },
                new { Title = "Men's Denim Jacket", Description = "Classic blue denim jacket with button-front and chest pockets", Price = 89.99, Category = "Clothing" },
                new { Title = "Ceramic Vase", Description = "Hand-painted ceramic vase, 25 cm tall, ideal for fresh bouquets", Price = 45.50, Category = "Home Decor" },
                new { Title = "Hardcover Notebook", Description = "A5 notebook, 200 lined pages, durable hardcover with elastic band", Price = 12.75, Category = "Stationery" },
                new { Title = "Running Shoes", Description = "Lightweight mesh running shoes with cushioned sole", Price = 129.95, Category = "Footwear" },
                new { Title = "Children's Building Blocks", Description = "Set of 100 colorful interlocking blocks for ages 3+", Price = 29.90, Category = "Toys" },
                new { Title = "Stainless Steel Cookware Set", Description = "5-piece pot and pan set, oven-safe up to 260 °C", Price = 159.00, Category = "Kitchen" },
                new { Title = "Yoga Mat", Description = "Extra-thick non-slip yoga mat, 183 × 61 × 0.6 cm", Price = 39.99, Category = "Sports" },
                new { Title = "Natural Soy Candle", Description = "200 g hand-poured lavender-scented soy wax candle", Price = 22.00, Category = "Beauty" },
                new { Title = "Outdoor Camping Lantern", Description = "Rechargeable LED lantern with 3 brightness levels", Price = 34.50, Category = "Outdoor" },
                new { Title = "Leather Wallet", Description = "Men's bifold wallet in genuine leather with RFID protection", Price = 49.99, Category = "Accessories" },
                new { Title = "Bluetooth Speaker", Description = "Portable waterproof speaker with up to 12 h playtime", Price = 75.00, Category = "Electronics" }
            };
            
            foreach (var product in products)
            {
                var productId = _connection.ExecuteScalar<int>(
                    @"INSERT INTO Products (Title, Description, Price, Category)
                    VALUES (@Title, @Description, @Price, @Category);
                    SELECT last_insert_rowid()", product);
                    
                // Add main image with PNG extension
                _connection.Execute(
                    @"INSERT INTO ProductImages (ProductId, FileName)
                    VALUES (@ProductId, @FileName)",
                    new { ProductId = productId, FileName = $"product-{productId}.png" }
                );
                
                // Add two alternative images with PNG extension
                _connection.Execute(
                    @"INSERT INTO ProductImages (ProductId, FileName)
                    VALUES (@ProductId, @FileName)",
                    new { ProductId = productId, FileName = $"product-{productId}-alt1.png" }
                );
                
                _connection.Execute(
                    @"INSERT INTO ProductImages (ProductId, FileName)
                    VALUES (@ProductId, @FileName)",
                    new { ProductId = productId, FileName = $"product-{productId}-alt2.png" }
                );
            }
        }
    }
}