namespace Server.Models.DTOs
{
    public class ProductDetailResponse
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Price { get; set; }
        public string Category { get; set; } = string.Empty;
        public List<string> Images { get; set; } = new List<string>();
    }
}