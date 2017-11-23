using System;
using System.Threading.Tasks;
using AutoCity.Controllers.Resources;
using AutoCity.Core.Models;
using AutoCity.Persistance;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace AutoCity.Controllers
{
	[Route("/api/vehicles/")]
	public class VehicleController : Controller
	{
		private readonly AutoCityDbContext context;
		private readonly IMapper mapper;
		public VehicleController(AutoCityDbContext context, IMapper mapper)
		{
			this.mapper = mapper;
			this.context = context;
		}
		[HttpPost]
		public async Task<IActionResult> CreateVehicle([FromBody] VehicleResource vehicleResource)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}
			var vehicle = mapper.Map<VehicleResource,Vehicle>(vehicleResource);
			vehicle.LastUpdate = DateTime.Now;

			context.Add(vehicle);
			await context.SaveChangesAsync();

			return Ok(vehicle);
		}

	}
}