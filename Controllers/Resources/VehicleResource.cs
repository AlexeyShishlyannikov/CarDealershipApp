using System;
using AutoCity.Core.Models;

namespace AutoCity.Controllers.Resources
{
    public class VehicleResource
    {
        public int Id { get; set; }
		public int ModelId { get; set; }
		public KeyValuePairResource Model { get; set; }
		public KeyValuePairResource Make { get; set; }

		public DateTime YearMade { get; set; }
		public DateTime LastUpdate { get; set; }
		public int Price { get; set; }
		public string VinNumber { get; set; }
		public string TransmissionType { get; set; }
		public int Mileage { get; set; }
		public string Color { get; set; }
		public int MPG { get; set; }
	}
}