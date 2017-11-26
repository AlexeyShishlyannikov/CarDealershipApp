using System.Collections.Generic;
using System.Threading.Tasks;
using AutoCity.Controllers.Resources;
using AutoCity.Core.Models;
using AutoCity.Persistance;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoCity.Controllers
{
	[Route("/api/makes/")]
    public class MakesController : Controller
    {
		private readonly IMapper mapper;
		private readonly AutoCityDbContext context;
		public MakesController(AutoCityDbContext context, IMapper mapper)
		{
			this.context = context;
			this.mapper = mapper;
		}
        [HttpGet]
		public async Task<IActionResult> GetMakes()
		{
			var makes = await context.Makes.Include(m => m.Models).ToListAsync();

			return Ok(mapper.Map<List<Make>, List<MakeResource>>(makes));
		}
    }
}