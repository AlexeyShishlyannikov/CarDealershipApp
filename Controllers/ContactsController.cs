using System.Threading.Tasks;
using AutoCity.Controllers.Resources;
using AutoCity.Core.Models;
using AutoCity.Persistance;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AutoCity.Controllers
{
	[Route("/api/contacts/")]
	public class ContactsController : Controller
	{
		private readonly AutoCityDbContext context;
		private readonly IMapper mapper;
		public ContactsController(AutoCityDbContext context, IMapper mapper)
		{
			this.mapper = mapper;
			this.context = context;
		}

		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateContacts(int id, [FromBody] ContactsResource contactsResource)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);
			var contacts = await context.Contacts.SingleOrDefaultAsync(v => v.Id == id);
			mapper.Map<ContactsResource, Contacts>(contactsResource, contacts);
			await context.SaveChangesAsync();

			return Ok(contactsResource);
		}
		[HttpGet]
		public async Task<IActionResult> GetContacts()
		{
			var contacts = await context.Contacts.FirstAsync();
			return Ok(mapper.Map<Contacts,ContactsResource>(contacts));
		}
	}
}