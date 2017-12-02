namespace CarDealershipApp.Core.Models
{
    public class CarBuyer
    {
        public int Id { get; set; }
		public string IdentityId { get; set; }
		public ApplicationUser Identity { get; set; }
		public string Location { get; set; }
    }
}