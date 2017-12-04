using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Threading.Tasks;
using AutoCity.Controllers.Resources;
using AutoCity.Core.Models;
using AutoCity.Persistance;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

		[HttpGet("{id}")]
		public async Task<IActionResult> GetVehicle(int id)
		{
			var vehicle = await context.Vehicles
				.Include(v => v.Model)
					.ThenInclude(v => v.Make)
				.SingleOrDefaultAsync(v => v.Id == id);
			
			if(vehicle == null)
				return NotFound("Vehicle with this Id was not found in database.");

			var vehicleResource = mapper.Map<Vehicle, VehicleResource>(vehicle);

			return Ok(vehicleResource);
		}

		[HttpGet]
		public async Task<IActionResult> GetVehicles()
		{
			var vehicles = await context.Vehicles
			.Include(v => v.Model)
				.ThenInclude(v => v.Make)
			.ToListAsync();

			if(vehicles == null)
				return NotFound("There are no vehicles in database");

			return Ok(mapper.Map<IEnumerable<Vehicle>,IEnumerable<VehicleResource>>(vehicles));
		}
		

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateVehicle(int id,[FromBody] VehicleResource vehicleResource)
		{
			if(!ModelState.IsValid)
				return BadRequest(ModelState);
			var vehicle = await context.Vehicles.SingleOrDefaultAsync(v => v.Id == id);
			if(vehicle == null)
				return NotFound();
			mapper.Map<VehicleResource, Vehicle>(vehicleResource, vehicle);
			vehicle.LastUpdate = DateTime.Now;

			await context.SaveChangesAsync();

			vehicle = await context.Vehicles
				.Include(v => v.Model)
					.ThenInclude(v => v.Make)
				.SingleOrDefaultAsync(v => v.Id == id);
			var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

			return Ok(result);
		}
		

		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteVehicle(int id)
		{
			var vehicle = await context.Vehicles.SingleOrDefaultAsync(v => v.Id == id);
			if(vehicle == null)
				return NotFound();
			
			context.Remove(vehicle);

			await context.SaveChangesAsync();
			
			return Ok(id);
		}
	}
}