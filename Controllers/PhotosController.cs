using System.Collections.Generic;
using System.Linq;
using System;
using System.Threading.Tasks;
using AutoCity.Controllers.Resources;
using AutoCity.Core.Models;
using AutoCity.Persistance;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.IO;
using Microsoft.AspNetCore.Authorization;

namespace AutoCity.Controllers
{
	[Route("/api/vehicles/{vehicleId}/photos/")]
	public class PhotosController : Controller
	{
		private readonly IHostingEnvironment host;
		private readonly IMapper mapper;
		private readonly IOptionsSnapshot<PhotoSettings> options;
		private readonly AutoCityDbContext context;
		private readonly PhotoSettings photoSettings;
		public PhotosController(IHostingEnvironment host, IMapper mapper, IOptionsSnapshot<PhotoSettings> options, AutoCityDbContext context)
		{
			this.photoSettings = options.Value;
			this.context = context;
			this.options = options;
			this.mapper = mapper;
			this.host = host;
		}
		[HttpGet]
		public async Task<IEnumerable<PhotoResource>> GetPhotos(int vehicleId)
		{
			var photos = await context.Photos.Where(p => p.VehicleId == vehicleId).ToListAsync();

			return mapper.Map<IEnumerable<Photo>, IEnumerable<PhotoResource>>(photos);
		}
	
		[HttpPost]
		public async Task<IActionResult> UploadPhoto(int vehicleId, IFormFile file)
		{
			var vehicle = await context.Vehicles.SingleOrDefaultAsync(v => v.Id == vehicleId);
			if (vehicle == null)
				return NotFound();
			if (file == null)
				return BadRequest("Null file");

			if (file.Length == 0 || file.Length > photoSettings.MaxBytes) return BadRequest("Wrong File size(over 10mb)");
			if (!photoSettings.isSupported(file.FileName)) return BadRequest("Invalid file type");

			var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");
			if (!Directory.Exists(uploadsFolderPath))
				Directory.CreateDirectory(uploadsFolderPath);
			var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
			var filePath = Path.Combine(uploadsFolderPath, fileName);

			using (var stream = new FileStream(filePath, FileMode.Create))
			{
				await file.CopyToAsync(stream);
			}

			var photo = new Photo { FileName = fileName };
			vehicle.Photos.Add(photo);
			await context.SaveChangesAsync();

			return Ok(mapper.Map<Photo, PhotoResource>(photo));
		}
	
		[HttpDelete("{photoId}")]
		public async Task<IActionResult> DeletePhoto(int vehicleId, int photoId)
		{
			var vehicle = await context.Vehicles.SingleOrDefaultAsync(v => v.Id == vehicleId);
			if (vehicle == null)
				return NotFound();
			var uploadsFolderPath = Path.Combine(host.WebRootPath, "uploads");
			var photo = await context.Photos.Where(p => p.VehicleId == vehicleId).SingleOrDefaultAsync(p => p.Id == photoId);
			if (photo == null)
				return NotFound();
			var filePath = Path.Combine(uploadsFolderPath, photo.FileName);
			if(System.IO.File.Exists(filePath))
			{
				System.IO.File.Delete(filePath);
				context.Remove(photo);
				await context.SaveChangesAsync();
			}
			else
				return BadRequest();
			return Ok(filePath + " Deleted");
		}
	}
}