using ContactsApp.Models;
using Microsoft.AspNetCore.Identity;

namespace ContactsApp.Data
{
	public class Seeder
	{
		public static void Seed(AppDbContext context)
		{
			if (!context.Categories.Any())
			{
				var categories = new List<Category>
				{
					new Category { Name = "Business" },
					new Category { Name = "Private" },
					new Category { Name = "Other" }
				};

				context.Categories.AddRange(categories);
				context.SaveChanges();

				var business = context.Categories.First(c => c.Name == "Business");

				context.SubCategories.AddRange(new List<SubCategory>
				{
					new SubCategory { Name = "Boss", CategoryId = business.Id },
					new SubCategory { Name = "Client", CategoryId = business.Id }
				});

				context.SaveChanges();
			}

			if (!context.Contacts.Any())
			{
				var contacts = new List<Contact>
				{
					new Contact
					{
						FirstName = "Jan",
						LastName = "Kowalski",
						Email = "jan@kowalski.pl",
						PasswordHash = BCrypt.Net.BCrypt.HashPassword("password"),
						CategoryId = context.Categories.First(c => c.Name == "Private").Id
					},
					new Contact
					{
						FirstName = "Wojciech",
						LastName = "Nowak",
						Email = "wojciech@nowak.pl",
						PasswordHash = BCrypt.Net.BCrypt.HashPassword("password"),
						CategoryId = context.Categories.First(c => c.Name == "Private").Id
					},
					new Contact
					{
						FirstName = "Andrzej",
						LastName = "Wiśniewski",
						Email = "andrzej@wisniewski.pl",
						PasswordHash = BCrypt.Net.BCrypt.HashPassword("password"),
						CategoryId = context.Categories.First(c => c.Name == "Private").Id
					}
				};

				context.Contacts.AddRange(contacts);
				context.SaveChanges();
			}
		}
	}
}
