using Microsoft.EntityFrameworkCore;
using ContactsApp.Models;
using System.Collections.Generic;

namespace ContactsApp.Data
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

		public DbSet<User> Users { get; set; }
		public DbSet<Contact> Contacts { get; set; }
		public DbSet<Category> Categories { get; set; }
		public DbSet<SubCategory> SubCategories { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			// User name uniqueness
			modelBuilder.Entity<User>()
				.HasIndex(u => u.Name)
				.IsUnique();

			// Email uniqueness
			modelBuilder.Entity<Contact>()
				.HasIndex(c => c.Email)
				.IsUnique();

			// Contact-Category relationship
			modelBuilder.Entity<Contact>()
				.HasOne(c => c.Category)
				.WithMany()
				.HasForeignKey(c => c.CategoryId);

			// Contact-SubCategory relationship
			modelBuilder.Entity<Contact>()
				.HasOne(c => c.SubCategory)
				.WithMany(sc => sc.Contacts)
				.HasForeignKey(c => c.SubCategoryId);

			// Category-SubCategory relationship
			modelBuilder.Entity<SubCategory>()
				.HasOne(sc => sc.Category)
				.WithMany(c => c.SubCategories)
				.HasForeignKey(sc => sc.CategoryId);
		}
	}
}
