using Dapper;
using Server.Models;
using Server.Models.DTOs;
using System.Data;

namespace Server.Services
{
    public class ProductService
    {
        private readonly IDbConnection _connection;

        public ProductService(IDbConnection connection)
        {
            _connection = connection;
        }

        public async Task<IEnumerable<ProductListResponse>> GetAllProductsAsync()
        {
            var query = @"
                SELECT p.*, pi.FileName as ImageFileName
                FROM Products p
                LEFT JOIN (
                    SELECT ProductId, FileName, MIN(Id) as MinId
                    FROM ProductImages
                    GROUP BY ProductId
                ) as FirstImages ON p.Id = FirstImages.ProductId
                LEFT JOIN ProductImages pi ON FirstImages.ProductId = pi.ProductId AND FirstImages.MinId = pi.Id";

            var productDict = new Dictionary<int, ProductListResponse>();
            
            await _connection.QueryAsync<Product, string, ProductListResponse>(
                query,
                (product, imageFileName) =>
                {
                    if (!productDict.TryGetValue(product.Id, out var productResponse))
                    {
                        productResponse = new ProductListResponse
                        {
                            Id = product.Id,
                            Title = product.Title,
                            Description = product.Description,
                            Price = product.Price,
                            Category = product.Category,
                            Image = imageFileName != null ? $"/images/{imageFileName}" : null
                        };
                        productDict.Add(product.Id, productResponse);
                    }
                    return productResponse;
                },
                splitOn: "ImageFileName"
            );
            
            return productDict.Values;
        }

        public async Task<ProductDetailResponse?> GetProductByIdAsync(int id)
        {
            // Get the product
            var product = await _connection.QueryFirstOrDefaultAsync<Product>(
                "SELECT * FROM Products WHERE Id = @Id", new { Id = id });
            
            if (product == null)
            {
                return null;
            }
            
            // Get all images for the product
            var images = await _connection.QueryAsync<string>(
                "SELECT FileName FROM ProductImages WHERE ProductId = @ProductId",
                new { ProductId = id });
            
            return new ProductDetailResponse
            {
                Id = product.Id,
                Title = product.Title,
                Description = product.Description,
                Price = product.Price,
                Category = product.Category,
                Images = images.Select(img => $"/images/{img}").ToList()
            };
        }
    }
}