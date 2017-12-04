using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoCity.Core.Models;
using AutoCity.Persistance;
using AutoMapper;
using CarDealershipApp.Auth;
using CarDealershipApp.Core.Models;
using CarDealershipApp.Helpers;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace AutoCity
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
		private const string SecretKey = "iNivDmHLpUA223sqsfhqGbMRdRj1PVkH"; // todo: get this from somewhere secure
		private readonly SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(SecretKey));

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
			services.Configure<PhotoSettings>(Configuration.GetSection("PhotoSettings"));

			services.AddAutoMapper();

			services.AddDbContext<AutoCityDbContext>(options =>
				options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

			services.AddSingleton<IJwtFactory, JwtFactory>();

			

			services.AddIdentity<ApplicationUser, IdentityRole>
				(o =>
				{
					// configure identity options
					o.Password.RequireDigit = false;
					o.Password.RequireLowercase = false;
					o.Password.RequireUppercase = false;
					o.Password.RequireNonAlphanumeric = false;
					o.Password.RequiredLength = 6;
				})
				.AddEntityFrameworkStores<AutoCityDbContext>()
				.AddDefaultTokenProviders();
			
			// jwt wire up
			// Get options from app settings
			// var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));
			var jwtAppSettingOptions = Configuration.GetSection(nameof(JwtIssuerOptions));
			

			services.AddAuthentication( options => {}).AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>{
				// options.AddPolicy("ApiUser", policy => policy.RequireClaim(Constants.Strings.JwtClaimIdentifiers.Rol, Constants.Strings.JwtClaims.ApiAccess));
				options.RequireHttpsMetadata = false;
				options.SaveToken = true;

				options.TokenValidationParameters = new TokenValidationParameters()
				{
					ValidIssuer = Configuration["Tokens:Issuer"],
					ValidAudience = Configuration["Tokens:Issuer"],
					IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Tokens:Key"]))
				};
			});

			// Configure JwtIssuerOptions
			services.Configure<JwtIssuerOptions>(options =>
			{
				options.Issuer = jwtAppSettingOptions[nameof(JwtIssuerOptions.Issuer)];
				options.Audience = jwtAppSettingOptions[nameof(JwtIssuerOptions.Audience)];
				options.SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha256);
			});
			

            services.AddMvc().AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<Startup>());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
			// app.UseAuthentication();
			

            app.UseStaticFiles();
			
			app.UseAuthentication();
			

            app.UseMvc();
        }
    }
}
