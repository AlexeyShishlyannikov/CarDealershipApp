using System.Threading.Tasks;
using AutoCity.Persistance;
using AutoMapper;
using CarDealershipApp.Controllers.Resources;
using CarDealershipApp.Core.Models;
using CarDealershipApp.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CarDealershipApp.Controllers
{

	[Route("api/accounts/")]
	public class AccountsController : Controller
	{
		private readonly AutoCityDbContext context;
		private readonly IMapper mapper;
		private readonly UserManager<ApplicationUser> userManager;
		public AccountsController(AutoCityDbContext context, IMapper mapper, UserManager<ApplicationUser> userManager)
		{
			this.userManager = userManager;
			this.mapper = mapper;
			this.context = context;
		}
		[HttpPost]
		public async Task<IActionResult> Register([FromBody] RegistrationResource registrationResource)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}
			var userIdentity = mapper.Map<ApplicationUser>(registrationResource);
			var result = await userManager.CreateAsync(userIdentity, registrationResource.Password);

			if(!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result,ModelState));

			await context.CarBuyers.AddAsync(new CarBuyer
			{
				IdentityId = userIdentity.Id,
				Location = registrationResource.Location
			});
			await context.SaveChangesAsync();

			return new OkObjectResult("Account created");
		}
	}
}