namespace AutoCity.Core.Models
{
    public class Contacts
    {
		public byte Id { get; set; }
		public string ContactName { get; set; }
        public string Phone { get; set; }
		public string Street { get; set; }
		public string City { get; set; }
		public string ZipCode { get; set; }
		public string FacebookUrl { get; set; }
		public string InstagramUrl { get; set; }
    }
}