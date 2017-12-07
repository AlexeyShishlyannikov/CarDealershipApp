using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using CarDealershipApp.Auth;
using CarDealershipApp.Controllers.Resources;
using CarDealershipApp.Core.Models;
using CarDealershipApp.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace CarDealershipApp.Controllers
{
	[Route("/api/auth")]
    public class AuthController : Controller
    {
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly IJwtFactory _jwtFactory;
		private readonly JsonSerializerSettings _serializerSettings;
		private readonly JwtIssuerOptions _jwtOptions;
		public AuthController(UserManager<ApplicationUser> userManager, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions)
		{
			_userManager = userManager;
			_jwtFactory = jwtFactory;
			_jwtOptions = jwtOptions.Value;

			_serializerSettings = new JsonSerializerSettings
			{
				Formatting = Formatting.Indented
			};
		}

        [HttpPost("login")]
		public async Task<IActionResult> Post([FromBody]CredentialsResource credentials)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest("Invalid username or password.");
			}

			var identity = await GetClaimsIdentity(credentials.UserName, credentials.Password);
			if (identity == null)
			{
				return BadRequest("Invalid username or password.");
			}

			// Serialize and return the response
			var response = new
			{
				id = identity.Claims.Single(c => c.Type == "id").Value,
				auth_token = await _jwtFactory.GenerateEncodedToken(credentials.UserName, identity),
				expires_in = (int)_jwtOptions.ValidFor.TotalSeconds
			};

			var json = JsonConvert.SerializeObject(response, _serializerSettings);
			return new OkObjectResult(json);
		}

		private async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password)
		{
			if (!string.IsNullOrEmpty(userName) && !string.IsNullOrEmpty(password))
			{
				// get the user to verifty
				var userToVerify = await _userManager.FindByNameAsync(userName);

				if (userToVerify != null)
				{
					// check the credentials  
					if (await _userManager.CheckPasswordAsync(userToVerify, password))
					{
						return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id));
					}
				}
			}

			// Credentials are invalid, or account doesn't exist
			return await Task.FromResult<ClaimsIdentity>(null);
		}
    }
}