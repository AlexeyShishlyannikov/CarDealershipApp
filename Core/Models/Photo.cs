using System.ComponentModel.DataAnnotations;

namespace AutoCity.Core.Models
{
    public class Photo
    {
		public int Id { get; set; }
		[Required]
		[StringLength(255)]
		public int VehicleId { get; set; }
		public string FileName { get; set; }
    }
}