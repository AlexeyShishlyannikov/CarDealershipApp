using Microsoft.EntityFrameworkCore;

namespace AutoCity.Persistance
{
    public class AutoCityDbContext : DbContext
    {
		public AutoCityDbContext(DbContextOptions<AutoCityDbContext> options) : base(options)
		{
			
		}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
		{

		}
    }
}