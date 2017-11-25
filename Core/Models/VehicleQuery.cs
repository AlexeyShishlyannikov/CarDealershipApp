namespace AutoCity.Core.Models
{
    public class VehicleQuery
    {
        public int? MakeId { get; set; }
		public int? ModelId { get; set; }
		public int? YearMade { get; set; }
		public int? Price { get; set; }
		public string SortBy { get; set; }
		public bool IsSortAscending { get; set; }
		public int Page { get; set; }
		public int PageSize { get; set; }
    }
}