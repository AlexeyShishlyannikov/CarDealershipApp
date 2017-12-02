using CarDealershipApp.Controllers.Resources.Validations;
using FluentValidation.Attributes;

namespace CarDealershipApp.Controllers.Resources
{
	[Validator(typeof(RegistrationResourceValidator))]
    public class RegistrationResource
    {
        public string Email { get; set; }
		public string Password { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }
		public string Location { get; set; }
    }
}