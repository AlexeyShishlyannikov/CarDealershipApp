using FluentValidation.Attributes;
using CarDealershipApp.Controllers.Resources.Validations;
namespace CarDealershipApp.Controllers.Resources
{
	[Validator(typeof(CredentialsResourceValidator))]
	    public class CredentialsResource
    {
        public string UserName { get; set; }
		public string Password { get; set; }
	}
}