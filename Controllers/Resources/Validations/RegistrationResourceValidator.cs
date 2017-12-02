using FluentValidation;

namespace CarDealershipApp.Controllers.Resources.Validations
{
    public class RegistrationResourceValidator : AbstractValidator<RegistrationResource>
    {
        public RegistrationResourceValidator()
		{
			RuleFor(r => r.Email).NotEmpty().WithMessage("Email cannot be empty");
			RuleFor(r => r.Password).NotEmpty().WithMessage("Password cannot be empty");
			RuleFor(r => r.FirstName).NotEmpty().WithMessage("FirstName cannot be empty");
			RuleFor(r => r.LastName).NotEmpty().WithMessage("LastName cannot be empty");
			RuleFor(r => r.Location).NotEmpty().WithMessage("Location cannot be empty");
		}
    }
}