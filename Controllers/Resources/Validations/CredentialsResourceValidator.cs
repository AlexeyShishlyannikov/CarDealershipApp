using FluentValidation;

namespace CarDealershipApp.Controllers.Resources.Validations
{
    public class CredentialsResourceValidator : AbstractValidator<CredentialsResource>
    {
		public CredentialsResourceValidator()
		{
			RuleFor(r => r.UserName).NotEmpty().WithMessage("Username cannot be empty");
			RuleFor(r => r.Password).NotEmpty().WithMessage("Password cannot be empty");
			RuleFor(r => r.Password).Length(6, 12).WithMessage("Password must be between 6 and 12 characters");
		}
	}
}