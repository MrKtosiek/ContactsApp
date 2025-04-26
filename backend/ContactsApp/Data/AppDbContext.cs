using Microsoft.EntityFrameworkCore;
using ContactsApp.Models;
using System.Collections.Generic;

namespace ContactsApp.Data
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

		public DbSet<Contact> Contacts { get; set; }
		public DbSet<Category> Categories { get; set; }
		public DbSet<SubCategory> SubCategories { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<Contact>()
				.HasIndex(c => c.Email)
				.IsUnique(); // Email musi być unikalny
		}
	}
}
