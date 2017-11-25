using AutoCity.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace AutoCity.Persistance
{
    public class AutoCityDbContext : DbContext
    {
		public DbSet<Make> Makes { get; set; }
		public DbSet<Model> Models { get; set; }
		public DbSet<Vehicle> Vehicles { get; set; }
		public DbSet<Contacts> Contacts { get; set; }
		public DbSet<Photo> Photos { get; set; }
		public AutoCityDbContext(DbContextOptions<AutoCityDbContext> options) : base(options)
		{		
		}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
		{

		}
    }
}