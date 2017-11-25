using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace AutoCity.Core.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
		public int ModelId { get; set; }
		public Model Model { get; set; }
		public int YearMade { get; set; }
		public DateTime LastUpdate { get; set; }
		public int Price { get; set; }
		public string VinNumber { get; set; }
		public string TransmissionType { get; set; }
		public int Mileage { get; set; }
		public string Color { get; set; }
		public int MPG { get; set; }
		public string Features { get; set; }
		public ICollection<Photo> Photos { get; set; }
		public Vehicle()
		{
			Photos = new Collection<Photo>();
		}
    }
}