using System.Threading.Tasks;
using AutoCity.Controllers.Resources;
using AutoCity.Core.Models;
using AutoCity.Persistance;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AutoCity.Controllers
{
	[Route("/api/models/")]
	public class ModelController : Controller
	{
		private readonly IMapper mapper;
		private readonly AutoCityDbContext context;
		public ModelController(AutoCityDbContext context, IMapper mapper)
		{
			this.context = context;
			this.mapper = mapper;
		}
		
		[HttpPost]
		public async Task<IActionResult> AddModel([FromBody] ModelResource modelResource)
		{
			if(!ModelState.IsValid)
				return BadRequest(ModelState);
			
			var model = mapper.Map<ModelResource, Model>(modelResource);

			context.Add(model);
			await context.SaveChangesAsync();

			return Ok(modelResource);
		}
		
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteModel(int id)
		{
			var model = await context.Models.FindAsync(id);
			if(model == null)
				return NotFound();
			context.Models.Remove(model);
			await context.SaveChangesAsync();

			return Ok(id);
		}

	}
}